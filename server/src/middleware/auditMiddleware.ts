import { NextFunction, Request, Response } from "express";
import type { AuthenticatedUser } from "../types/express";
import { UserLog } from "../models/user-log.model";
import { UpdateLog } from "../models/update-log.model";

const MAX_SNIPPET_LENGTH = 500;
const SENSITIVE_FIELDS = new Set(["password", "passwordHash", "token"]);
const IGNORE_UPDATE_FIELDS = new Set([
  "updatedAt",
  "createdAt",
  "ownerId",
  "enabled",
  "id",
]);

const stringify = (value: unknown) => {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "string") {
    return value.length > MAX_SNIPPET_LENGTH
      ? `${value.slice(0, MAX_SNIPPET_LENGTH)}…`
      : value;
  }
  try {
    const serialized = JSON.stringify(value);
    return serialized.length > MAX_SNIPPET_LENGTH
      ? `${serialized.slice(0, MAX_SNIPPET_LENGTH)}…`
      : serialized;
  } catch (error) {
    return String(value);
  }
};

export const ownerAssignment = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.method === "POST" && req.user?.id && req.body && typeof req.body === "object") {
    if (!("ownerId" in req.body) || req.body.ownerId === undefined || req.body.ownerId === null) {
      req.body.ownerId = req.user.id;
    }
  }
  next();
};

export const auditLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = process.hrtime.bigint();
  const user = req.user as AuthenticatedUser | undefined;

  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = ((body?: unknown) => {
    res.locals.responsePayload = body;
    return originalJson(body);
  }) as typeof res.json;

  res.send = ((body?: unknown) => {
    res.locals.responsePayload = body;
    return originalSend(body);
  }) as typeof res.send;

  res.on("finish", () => {
    const durationNs = Number(process.hrtime.bigint() - start);
    const durationMs = Math.round(durationNs / 1_000_000);

    const snippet = stringify(res.locals.responsePayload);
    const category = req.baseUrl || req.originalUrl;
    const action = mapMethodToAction(req.method);
    const errorMessage = res.locals.errorMessage ? String(res.locals.errorMessage) : null;

    void UserLog.create({
      userId: user?.id ?? null,
      category,
      action,
      responseCode: res.statusCode,
      responseSnippet: snippet,
      errorMessage,
      responseTimeMs: durationMs,
      metadata: {
        method: req.method,
        path: req.originalUrl,
      },
    }).catch((error) => {
      console.error("Failed to create user log", error);
    });
  });

  next();
};

export const logFieldChanges = async <T extends { [key: string]: unknown }>(
  params: {
    userId?: number | null;
    modelName: string;
    recordId: number;
    previous: T;
    next: T;
  }
): Promise<void> => {
  const { userId = null, modelName, recordId, previous, next } = params;
  const changes: Array<{ fieldName: string; previousValue: string | null; newValue: string | null }> = [];

  const keys = new Set([...Object.keys(previous ?? {}), ...Object.keys(next ?? {})]);

  for (const key of keys) {
    if (IGNORE_UPDATE_FIELDS.has(key)) {
      continue;
    }
    if (SENSITIVE_FIELDS.has(key)) {
      continue;
    }

    const beforeValue = previous ? (previous as Record<string, unknown>)[key] : undefined;
    const afterValue = next ? (next as Record<string, unknown>)[key] : undefined;

    const beforeString = stringify(beforeValue);
    const afterString = stringify(afterValue);

    if (beforeString === afterString) {
      continue;
    }

    changes.push({
      fieldName: key,
      previousValue: beforeString,
      newValue: afterString,
    });
  }

  if (changes.length === 0) {
    return;
  }

  await UpdateLog.bulkCreate(
    changes.map((change) => ({
      userId,
      modelName,
      recordId,
      ...change,
    }))
  );
};

const mapMethodToAction = (method: string): string => {
  switch (method.toUpperCase()) {
    case "POST":
      return "create";
    case "PUT":
    case "PATCH":
      return "update";
    case "DELETE":
      return "delete";
    default:
      return "get";
  }
};
