import { Router } from "express";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItem,
  listMenuItems,
  updateMenuItem,
} from "../controllers/menu.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

router.get("/", listMenuItems);
router.get("/:id", getMenuItem);
router.post("/", requireAuth(["admin", "manager"]), createMenuItem);
router.patch("/:id", requireAuth(["admin", "manager"]), updateMenuItem);
router.delete("/:id", requireAuth(["admin", "manager"]), deleteMenuItem);

export default router;
