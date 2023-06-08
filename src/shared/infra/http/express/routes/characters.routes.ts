import { Router } from "express";
import { CreateCharacterController } from "../../../../../modules/characters/useCases/createCharacter/CreateCharacterController";
import { ListCharactersController } from "../../../../../modules/characters/useCases/listCharacters/ListCharactersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const routes = Router();

const createCharacterController = new CreateCharacterController();
const listCharactersController = new ListCharactersController();

routes.post("/", ensureAuthenticated, ensureAdmin, createCharacterController.handle);
routes.get("/", listCharactersController.handle);

export { routes as charactersRoutes };