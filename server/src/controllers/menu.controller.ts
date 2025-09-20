import { Request, Response } from "express";
import { Op } from "sequelize";
import { MenuItem } from "../models/menu-item.model";
import { AppError } from "../utils/AppError";
import { logFieldChanges } from "../middleware/auditMiddleware";

export const listMenuItems = async (req: Request, res: Response): Promise<void> => {
  const { category, search } = req.query;

  const where: Record<string, unknown> = {};

  if (category && typeof category === "string" && category !== "all") {
    where.category = category;
  }

  if (search && typeof search === "string") {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  const items = await MenuItem.findAll({
    where,
    order: [["category", "ASC"], ["name", "ASC"]],
  });

  res.json({ items });
};

export const getMenuItem = async (req: Request, res: Response): Promise<void> => {
  const item = await MenuItem.findByPk(req.params.id);
  if (!item) {
    throw new AppError("Menu item not found", 404);
  }
  res.json({ item });
};

export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, category, imageUrl, isHalal, prepTimeMinutes, servings, rating } = req.body;

  if (!name || !description || !price || !category) {
    throw new AppError("Name, description, price, and category are required", 400);
  }

  const item = await MenuItem.create({
    name,
    description,
    price,
    category,
    imageUrl: imageUrl || null,
    isHalal: isHalal ?? true,
    prepTimeMinutes: prepTimeMinutes ?? null,
    servings: servings || null,
    rating: rating ?? null,
    ownerId: req.user?.id ?? null,
  });

  res.status(201).json({ item });
};

export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
  const item = await MenuItem.findByPk(req.params.id);

  if (!item) {
    throw new AppError("Menu item not found", 404);
  }

  const previous = item.get({ plain: true });

  const { name, description, price, category, imageUrl, isHalal, prepTimeMinutes, servings, rating } = req.body;

  item.name = name ?? item.name;
  item.description = description ?? item.description;
  item.price = price ?? item.price;
  item.category = category ?? item.category;
  item.imageUrl = imageUrl ?? item.imageUrl;
  item.isHalal = isHalal ?? item.isHalal;
  item.prepTimeMinutes = prepTimeMinutes ?? item.prepTimeMinutes;
  item.servings = servings ?? item.servings;
  item.rating = rating ?? item.rating;

  await item.save();
  await logFieldChanges({
    userId: req.user?.id ?? null,
    modelName: "MenuItem",
    recordId: item.id,
    previous,
    next: item.get({ plain: true }),
  });

  res.json({ item });
};

export const deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
  const item = await MenuItem.findByPk(req.params.id);
  if (!item) {
    throw new AppError("Menu item not found", 404);
  }

  await item.destroy();

  res.status(204).send();
};
