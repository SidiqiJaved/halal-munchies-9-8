import { Request, Response } from "express";
import sequelize from "../config/database";
import { Location } from "../models/location.model";
import { MenuItem } from "../models/menu-item.model";
import { Order, OrderStatus } from "../models/order.model";
import { OrderItem } from "../models/order-item.model";
import { AppError } from "../utils/AppError";

interface OrderItemInput {
  menuItemId: number;
  quantity: number;
}

const TAX_RATE = Number(process.env.DEFAULT_TAX_RATE || 0.0825);

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const {
    customerName,
    email,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    specialInstructions,
    items,
    locationId,
  } = req.body;

  if (!customerName || !email || !phone || !addressLine1 || !city || !state || !postalCode) {
    throw new AppError("Missing required order fields", 400);
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError("Order must include at least one item", 400);
  }

  const sanitizedItems: OrderItemInput[] = items.map((item: OrderItemInput) => ({
    menuItemId: Number(item.menuItemId),
    quantity: Number(item.quantity || 0),
  }));

  const transaction = await sequelize.transaction();

  try {
    const menuItems = await MenuItem.findAll({
      where: { id: sanitizedItems.map((item) => item.menuItemId) },
      transaction,
    });

    if (menuItems.length !== sanitizedItems.length) {
      throw new AppError("One or more menu items are invalid", 400);
    }

    let subtotal = 0;

    const orderItemsPayload = sanitizedItems.map((item) => {
      const menuItem = menuItems.find((record) => record.id === item.menuItemId)!;
      const quantity = Math.max(1, item.quantity);
      const unitPrice = Number(menuItem.price);
      subtotal += unitPrice * quantity;

      return {
        menuItemId: menuItem.id,
        nameSnapshot: menuItem.name,
        imageUrlSnapshot: menuItem.imageUrl,
        quantity,
        unitPrice,
      };
    });

    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    const order = await Order.create(
      {
        customerName,
        email,
        phone,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        postalCode,
        specialInstructions: specialInstructions || null,
        subtotal,
        tax,
        total,
        locationId: locationId || null,
      },
      { transaction }
    );

    await OrderItem.bulkCreate(
      orderItemsPayload.map((item) => ({
        ...item,
        orderId: order.id,
      })),
      { transaction }
    );

    await transaction.commit();

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    res.status(201).json({ order: createdOrder });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const listOrders = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.query;

  const where: Record<string, unknown> = {};
  if (status && typeof status === "string") {
    where.status = status;
  }

  const orders = await Order.findAll({
    where,
    include: [
      {
        model: OrderItem,
        as: "items",
      },
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.json({ orders });
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      {
        model: OrderItem,
        as: "items",
      },
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.json({ order });
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const { status, specialInstructions, locationId } = req.body as {
    status?: OrderStatus;
    specialInstructions?: string;
    locationId?: number | null;
  };

  const order = await Order.findByPk(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (status) {
    order.status = status;
  }
  if (typeof specialInstructions === "string") {
    order.specialInstructions = specialInstructions;
  }
  if (locationId !== undefined) {
    order.locationId = locationId;
  }

  await order.save();

  res.json({ order });
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  await order.destroy();
  res.status(204).send();
};
