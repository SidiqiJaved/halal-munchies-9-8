import { Request, Response } from "express";
import { Op } from "sequelize";
import { Inspection } from "../models/inspection.model";
import { Location } from "../models/location.model";
import { AppError } from "../utils/AppError";
import { logFieldChanges } from "../middleware/auditMiddleware";

export const listInspections = async (req: Request, res: Response): Promise<void> => {
  const { status, locationId, upcomingOnly } = req.query;

  const where: Record<string, unknown> = {};

  if (status && typeof status === "string") {
    where.status = status;
  }

  if (locationId && typeof locationId === "string") {
    where.locationId = Number(locationId);
  }

  if (upcomingOnly === "true") {
    where.scheduledAt = { [Op.gte]: new Date() };
  }

  const inspections = await Inspection.findAll({
    where,
    include: [
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
    order: [["scheduledAt", "ASC"]],
  });

  const summary = {
    upcoming: inspections.filter((inspection) => inspection.status === "scheduled").length,
    completed: inspections.filter((inspection) => inspection.status === "completed").length,
    followUps: inspections.filter((inspection) => inspection.status === "follow_up").length,
  };

  res.json({ inspections, summary });
};

export const getInspection = async (req: Request, res: Response): Promise<void> => {
  const inspection = await Inspection.findByPk(req.params.id, {
    include: [
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
  });

  if (!inspection) {
    throw new AppError("Inspection not found", 404);
  }

  res.json({ inspection });
};

export const createInspection = async (req: Request, res: Response): Promise<void> => {
  const { locationId, scheduledAt, inspectorName, status, notes, followUpAt } = req.body;

  if (!locationId || !scheduledAt || !inspectorName) {
    throw new AppError("Location, scheduledAt, and inspectorName are required", 400);
  }

  const inspection = await Inspection.create({
    locationId,
    scheduledAt,
    inspectorName,
    status: status || "scheduled",
    notes: notes || null,
    followUpAt: followUpAt || null,
    ownerId: req.user?.id ?? null,
  });

  res.status(201).json({ inspection });
};

export const updateInspection = async (req: Request, res: Response): Promise<void> => {
  const inspection = await Inspection.findByPk(req.params.id);

  if (!inspection) {
    throw new AppError("Inspection not found", 404);
  }

  const previous = inspection.get({ plain: true });

  const { scheduledAt, status, inspectorName, score, passed, notes, actionItems, followUpAt } = req.body;

  inspection.scheduledAt = scheduledAt ?? inspection.scheduledAt;
  inspection.status = status ?? inspection.status;
  inspection.inspectorName = inspectorName ?? inspection.inspectorName;
  inspection.score = score ?? inspection.score;
  inspection.passed = passed ?? inspection.passed;
  inspection.notes = notes ?? inspection.notes;
  inspection.actionItems = actionItems ?? inspection.actionItems;
  inspection.followUpAt = followUpAt ?? inspection.followUpAt;

  await inspection.save();
  await logFieldChanges({
    userId: req.user?.id ?? null,
    modelName: "Inspection",
    recordId: inspection.id,
    previous,
    next: inspection.get({ plain: true }),
  });

  res.json({ inspection });
};

export const deleteInspection = async (req: Request, res: Response): Promise<void> => {
  const inspection = await Inspection.findByPk(req.params.id);
  if (!inspection) {
    throw new AppError("Inspection not found", 404);
  }
  await inspection.destroy();
  res.status(204).send();
};
