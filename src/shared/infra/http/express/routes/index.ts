import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { clansRoutes } from "./clans.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/clans", clansRoutes);

export { router as appRouter };