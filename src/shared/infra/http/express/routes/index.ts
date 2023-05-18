import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { charactersRoutes } from "./characters.routes";
import { clansRoutes } from "./clans.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/clans", clansRoutes);
router.use("/characters", charactersRoutes);

export { router as appRouter };