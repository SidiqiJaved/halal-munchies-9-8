import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "../controllers/orders.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

router.post("/", createOrder);
router.get("/", requireAuth(["admin", "manager", "franchisee"]), listOrders);
router.get("/:id", requireAuth(["admin", "manager", "franchisee"]), getOrder);
router.patch("/:id", requireAuth(["admin", "manager", "franchisee"]), updateOrder);
router.delete("/:id", requireAuth(["admin", "manager"]), deleteOrder);

export default router;
