import { Router } from "express";
import { AuthenticateUserController } from "../../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const routes = Router();

const authenticateUserController = new AuthenticateUserController();

routes.post("/sessions", authenticateUserController.handle);

export { routes as authRoutes };