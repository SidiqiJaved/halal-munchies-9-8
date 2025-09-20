import { Request, Response } from "express";
import { ChecklistItem } from "../models/checklist-item.model";
import { ChecklistProgress } from "../models/checklist-progress.model";
import { TrainingModule } from "../models/training-module.model";
import { TrainingProgress } from "../models/training-progress.model";
import { AppError } from "../utils/AppError";

const resolveUserId = (req: Request): number => {
  if (req.user) {
    return req.user.id;
  }

  const userId = req.query.userId ?? req.body.userId;
  if (!userId) {
    throw new AppError("User context is required", 400);
  }

  return Number(userId);
};

export const listTrainingModules = async (req: Request, res: Response): Promise<void> => {
  const userId = resolveUserId(req);

  const [modules, progressRecords] = await Promise.all([
    TrainingModule.findAll({ order: [["category", "ASC"], ["title", "ASC"]] }),
    TrainingProgress.findAll({ where: { userId } }),
  ]);

  const progressMap = new Map(progressRecords.map((record) => [record.moduleId, record]));

  const moduleDtos = modules.map((module) => {
    const progress = progressMap.get(module.id);
    return {
      id: module.id,
      title: module.title,
      description: module.description,
      durationMinutes: module.durationMinutes,
      type: module.type,
      category: module.category,
      isRequired: module.isRequired,
      difficulty: module.difficulty,
      progressPercent: progress ? Number(progress.progressPercent) : 0,
      isCompleted: progress ? progress.isCompleted : false,
      completedAt: progress?.completedAt,
    };
  });

  const completedCount = moduleDtos.filter((module) => module.isCompleted).length;
  const totalModules = moduleDtos.length;
  const progressPercent = totalModules === 0 ? 0 : Math.round((completedCount / totalModules) * 100);

  res.json({
    modules: moduleDtos,
    summary: {
      completedCount,
      totalModules,
      progressPercent,
    },
  });
};

export const toggleModuleCompletion = async (req: Request, res: Response): Promise<void> => {
  const userId = resolveUserId(req);
  const { id } = req.params;
  const { isCompleted, progressPercent } = req.body as {
    isCompleted?: boolean;
    progressPercent?: number;
  };

  const module = await TrainingModule.findByPk(id);
  if (!module) {
    throw new AppError("Training module not found", 404);
  }

  const [record, created] = await TrainingProgress.findOrCreate({
    where: { userId, moduleId: module.id },
    defaults: {
      progressPercent: progressPercent ?? (isCompleted ? 100 : 0),
      isCompleted: isCompleted ?? false,
      completedAt: isCompleted ? new Date() : null,
    },
  });

  if (!created) {
    if (typeof progressPercent === "number") {
      record.progressPercent = Math.max(0, Math.min(100, progressPercent));
    }

    if (typeof isCompleted === "boolean") {
      record.isCompleted = isCompleted;
      record.completedAt = isCompleted ? new Date() : null;
      if (isCompleted && (progressPercent === undefined || progressPercent < 100)) {
        record.progressPercent = 100;
      }
      if (!isCompleted && progressPercent === undefined) {
        record.progressPercent = 0;
      }
    }

    await record.save();
  }

  res.json({ progress: record });
};

export const listChecklistItems = async (req: Request, res: Response): Promise<void> => {
  const userId = resolveUserId(req);

  const [items, progressRecords] = await Promise.all([
    ChecklistItem.findAll({ order: [["orderIndex", "ASC"]] }),
    ChecklistProgress.findAll({ where: { userId } }),
  ]);

  const progressMap = new Map(progressRecords.map((record) => [record.checklistItemId, record]));

  const checklistDtos = items.map((item) => {
    const progress = progressMap.get(item.id);
    return {
      id: item.id,
      task: item.task,
      category: item.category,
      isRequired: item.isRequired,
      isCompleted: progress ? progress.isCompleted : false,
      completedAt: progress?.completedAt,
    };
  });

  res.json({
    items: checklistDtos,
    summary: {
      completed: checklistDtos.filter((item) => item.isCompleted).length,
      total: checklistDtos.length,
    },
  });
};

export const toggleChecklistItem = async (req: Request, res: Response): Promise<void> => {
  const userId = resolveUserId(req);
  const { id } = req.params;
  const { isCompleted } = req.body as { isCompleted?: boolean };

  const checklistItem = await ChecklistItem.findByPk(id);
  if (!checklistItem) {
    throw new AppError("Checklist item not found", 404);
  }

  if (typeof isCompleted !== "boolean") {
    throw new AppError("isCompleted must be provided", 400);
  }

  const [record, created] = await ChecklistProgress.findOrCreate({
    where: { userId, checklistItemId: checklistItem.id },
    defaults: {
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
    },
  });

  if (!created) {
    record.isCompleted = isCompleted;
    record.completedAt = isCompleted ? new Date() : null;
    await record.save();
  }

  res.json({ progress: record });
};
