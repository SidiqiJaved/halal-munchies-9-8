import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller";
import { optionalAuth, requireAuth } from "../middleware/authenticate";

const router = Router();

router.post("/login", login);
router.post("/register", optionalAuth(), register);
router.get("/me", requireAuth(), me);

export default router;
