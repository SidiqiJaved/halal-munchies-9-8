import { Request, Response } from "express";
import { Op } from "sequelize";
import { Location } from "../models/location.model";
import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";
import { logFieldChanges } from "../middleware/auditMiddleware";

export const listUsers = async (req: Request, res: Response): Promise<void> => {
  const { role, search } = req.query;

  const where: Record<string, unknown> = {};

  if (role && typeof role === "string") {
    where.role = role;
  }

  if (search && typeof search === "string") {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
  }

  const users = await User.findAll({
    where,
    attributes: ["id", "name", "email", "role", "phone", "locationId", "lastLoginAt"],
    include: [
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
    order: [["name", "ASC"]],
  });

  res.json({ users });
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "email",
      "role",
      "phone",
      "locationId",
      "jobTitle",
      "lastLoginAt",
    ],
    include: [
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json({ user });
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, role, phone, locationId, jobTitle } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const previous = user.get({ plain: true });

  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.phone = phone ?? user.phone;
  user.jobTitle = jobTitle ?? user.jobTitle;
  user.locationId = locationId ?? user.locationId;

  if (role) {
    user.role = role;
  }

  await user.save();
  await logFieldChanges({
    userId: req.user?.id ?? null,
    modelName: "User",
    recordId: user.id,
    previous,
    next: user.get({ plain: true }),
  });

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      locationId: user.locationId,
      jobTitle: user.jobTitle,
    },
  });
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await user.destroy();

  res.status(204).send();
};
