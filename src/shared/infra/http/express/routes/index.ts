import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

export { router as appRouter };