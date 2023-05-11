import { Router } from "express";
import { CreateClanController } from "../../../../../modules/clans/useCases/createClan/CreateClanController";
import { ListClansController } from "../../../../../modules/clans/useCases/listClans/ListClansController";

const routes = Router();

const createClanController = new CreateClanController();
const listClansController = new ListClansController();

routes.post("/", createClanController.handle);
routes.get("/", listClansController.handle);

export { routes as clansRoutes };