import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../models/user.model";
import type { AuthenticatedUser } from "../types/express";
import { AppError } from "../utils/AppError";

const jwtSecret = process.env.JWT_SECRET || "development-secret";

interface JwtPayload extends AuthenticatedUser {
  iat: number;
  exp: number;
}

const parseToken = (header?: string): string | null => {
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token;
};

export const requireAuth = (allowedRoles: UserRole[] = []) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const token = parseToken(req.headers.authorization);

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    try {
      const payload = jwt.verify(token, jwtSecret) as JwtPayload;
      req.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };

      if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
        throw new AppError("Forbidden", 403);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Invalid or expired token", 401);
    }
  };

export const optionalAuth = () =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const token = parseToken(req.headers.authorization);

    if (!token) {
      next();
      return;
    }

    try {
      const payload = jwt.verify(token, jwtSecret) as JwtPayload;
      req.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      console.warn("Failed to decode JWT", error);
    }

    next();
  };
