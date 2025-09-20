import { Router } from "express";
import {
  createCateringRequest,
  deleteCateringRequest,
  getCateringRequest,
  listCateringRequests,
  updateCateringRequest,
} from "../controllers/catering.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

const allowedRoles = ["manager", "franchisee", "admin"] as const;

router.post("/", createCateringRequest);
router.get("/", requireAuth([...allowedRoles]), listCateringRequests);
router.get("/:id", requireAuth([...allowedRoles]), getCateringRequest);
router.patch("/:id", requireAuth([...allowedRoles]), updateCateringRequest);
router.delete("/:id", requireAuth(["admin"]), deleteCateringRequest);

export default router;
