import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  getLocation,
  listLocations,
  updateLocation,
} from "../controllers/locations.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

router.get("/", listLocations);
router.get("/:id", getLocation);
router.post("/", requireAuth(["admin"]), createLocation);
router.patch("/:id", requireAuth(["admin"]), updateLocation);
router.delete("/:id", requireAuth(["admin"]), deleteLocation);

export default router;
