import { Request, Response } from "express";
import type { UserRole } from "../models/user.model";
import { User } from "../models/user.model";
import { authenticateUser, buildUserPayload, hashPassword, signToken } from "../services/auth.service";
import { AppError } from "../utils/AppError";

const assignRole = (req: Request, requestedRole?: UserRole): UserRole => {
  const allowedRoles: UserRole[] = [
    "customer",
    "employee",
    "manager",
    "franchisee",
    "admin",
  ];

  if (req.user && req.user.role === "admin" && requestedRole && allowedRoles.includes(requestedRole)) {
    return requestedRole;
  }

  return "customer";
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const { user, token } = await authenticateUser(email, password);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role, phone, locationId } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required", 400);
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new AppError("Email already in use", 409);
  }

  const passwordHash = await hashPassword(password);
  const finalRole = assignRole(req, role);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: finalRole,
    phone: phone || null,
    locationId: locationId || null,
  });

  const token = signToken(buildUserPayload(user));

  res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AppError("Not authenticated", 401);
  }

  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "name", "email", "role", "phone", "locationId"],
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json({ user });
};
