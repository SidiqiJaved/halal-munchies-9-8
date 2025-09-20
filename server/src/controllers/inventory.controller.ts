import { Request, Response } from "express";
import { Op } from "sequelize";
import { InventoryItem } from "../models/inventory-item.model";
import { AppError } from "../utils/AppError";
import { logFieldChanges } from "../middleware/auditMiddleware";

const getSummary = (items: InventoryItem[]) => {
  const now = new Date();

  let totalValue = 0;
  let lowStockCount = 0;
  let expiringSoonCount = 0;

  items.forEach((item) => {
    const currentStock = Number(item.currentStock);
    const cost = Number(item.costPerUnit);
    const minStock = Number(item.minStock);

    totalValue += currentStock * cost;

    if (currentStock <= minStock) {
      lowStockCount += 1;
    }

    if (item.expiryDate) {
      const expiry = new Date(item.expiryDate);
      const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays <= 3) {
        expiringSoonCount += 1;
      }
    }
  });

  return {
    totalValue: Number(totalValue.toFixed(2)),
    lowStockCount,
    expiringSoonCount,
  };
};

export const listInventoryItems = async (req: Request, res: Response): Promise<void> => {
  const { category, locationId, search } = req.query;

  const where: Record<string, unknown> = {};

  if (category && typeof category === "string" && category !== "all") {
    where.category = category;
  }

  if (locationId && typeof locationId === "string") {
    where.locationId = Number(locationId);
  }

  if (search && typeof search === "string") {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { supplier: { [Op.like]: `%${search}%` } },
    ];
  }

  const items = await InventoryItem.findAll({
    where,
    order: [["category", "ASC"], ["name", "ASC"]],
  });

  res.json({
    items,
    summary: getSummary(items),
  });
};

export const createInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    category,
    currentStock,
    minStock,
    maxStock,
    unit,
    costPerUnit,
    supplier,
    lastRestocked,
    expiryDate,
    locationId,
  } = req.body;

  if (!name || !category || !unit) {
    throw new AppError("Name, category, and unit are required", 400);
  }

  const item = await InventoryItem.create({
    name,
    category,
    currentStock: currentStock ?? 0,
    minStock: minStock ?? 0,
    maxStock: maxStock ?? 0,
    unit,
    costPerUnit: costPerUnit ?? 0,
    supplier: supplier || null,
    lastRestocked: lastRestocked || null,
    expiryDate: expiryDate || null,
    locationId: locationId || null,
    ownerId: req.user?.id ?? null,
  });

  res.status(201).json({ item });
};

export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const item = await InventoryItem.findByPk(req.params.id);

  if (!item) {
    throw new AppError("Inventory item not found", 404);
  }

  const previous = item.get({ plain: true });

  const {
    name,
    category,
    currentStock,
    minStock,
    maxStock,
    unit,
    costPerUnit,
    supplier,
    lastRestocked,
    expiryDate,
    locationId,
  } = req.body;

  item.name = name ?? item.name;
  item.category = category ?? item.category;
  item.currentStock = currentStock ?? item.currentStock;
  item.minStock = minStock ?? item.minStock;
  item.maxStock = maxStock ?? item.maxStock;
  item.unit = unit ?? item.unit;
  item.costPerUnit = costPerUnit ?? item.costPerUnit;
  item.supplier = supplier ?? item.supplier;
  item.lastRestocked = lastRestocked ?? item.lastRestocked;
  item.expiryDate = expiryDate ?? item.expiryDate;
  item.locationId = locationId ?? item.locationId;

  await item.save();
  await logFieldChanges({
    userId: req.user?.id ?? null,
    modelName: "InventoryItem",
    recordId: item.id,
    previous,
    next: item.get({ plain: true }),
  });

  res.json({ item });
};

export const deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const item = await InventoryItem.findByPk(req.params.id);
  if (!item) {
    throw new AppError("Inventory item not found", 404);
  }
  await item.destroy();
  res.status(204).send();
};
