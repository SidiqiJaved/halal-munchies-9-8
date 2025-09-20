import { Router } from "express";
import {
  createInventoryItem,
  deleteInventoryItem,
  listInventoryItems,
  updateInventoryItem,
} from "../controllers/inventory.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

router.get("/", requireAuth(["admin", "manager", "franchisee"]), listInventoryItems);
router.post("/", requireAuth(["admin", "manager"]), createInventoryItem);
router.patch("/:id", requireAuth(["admin", "manager"]), updateInventoryItem);
router.delete("/:id", requireAuth(["admin", "manager"]), deleteInventoryItem);

export default router;
