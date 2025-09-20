import { Router } from "express";
import {
  listChecklistItems,
  listTrainingModules,
  toggleChecklistItem,
  toggleModuleCompletion,
} from "../controllers/training.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

const allowedRoles = ["employee", "manager", "franchisee", "admin"] as const;

router.get("/modules", requireAuth([...allowedRoles]), listTrainingModules);
router.patch("/modules/:id", requireAuth([...allowedRoles]), toggleModuleCompletion);
router.get("/checklist", requireAuth([...allowedRoles]), listChecklistItems);
router.patch("/checklist/:id", requireAuth([...allowedRoles]), toggleChecklistItem);

export default router;
