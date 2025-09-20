import { Router } from "express";
import { deleteUser, getUser, listUsers, updateUser } from "../controllers/users.controller";
import { requireAuth } from "../middleware/authenticate";

const router = Router();

router.use(requireAuth(["admin"]));

router.get("/", listUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
