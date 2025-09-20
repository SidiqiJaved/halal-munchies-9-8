import { Router } from "express";
import authRoutes from "./auth.routes";
import cateringRoutes from "./catering.routes";
import inventoryRoutes from "./inventory.routes";
import inspectionsRoutes from "./inspections.routes";
import locationsRoutes from "./locations.routes";
import menuRoutes from "./menu.routes";
import ordersRoutes from "./orders.routes";
import trainingRoutes from "./training.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/menu", menuRoutes);
router.use("/orders", ordersRoutes);
router.use("/locations", locationsRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/training", trainingRoutes);
router.use("/inspections", inspectionsRoutes);
router.use("/catering", cateringRoutes);

export default router;
