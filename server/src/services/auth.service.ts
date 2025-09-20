import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import type { AuthenticatedUser } from "../types/express";
import { AppError } from "../utils/AppError";

const SALT_ROUNDS = 10;

const jwtSecret = process.env.JWT_SECRET || "development-secret";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1d";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const buildUserPayload = (user: User): AuthenticatedUser => ({
  id: user.id,
  email: user.email,
  role: user.role,
});

export const signToken = (payload: AuthenticatedUser): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw new AppError("Invalid email or password", 401);
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = signToken(buildUserPayload(user));
  return { user, token };
};
