import { Router } from "express";
import {
  createInspection,
  deleteInspection,
  getInspection,
  listInspections,
  updateInspection,
} from "../controllers/inspections.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

const allowedRoles = ["manager", "franchisee", "admin"] as const;

router.get("/", requireAuth([...allowedRoles]), listInspections);
router.get("/:id", requireAuth([...allowedRoles]), getInspection);
router.post("/", requireAuth([...allowedRoles]), createInspection);
router.patch("/:id", requireAuth([...allowedRoles]), updateInspection);
router.delete("/:id", requireAuth(["admin"]), deleteInspection);

export default router;
