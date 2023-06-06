import { Router } from "express";
import { CreateCharacterController } from "../../../../../modules/characters/useCases/createCharacter/CreateCharacterController";
import { ListCharactersController } from "../../../../../modules/characters/useCases/listCharacters/ListCharactersController";

const routes = Router();

const createCharacterController = new CreateCharacterController();
const listCharactersController = new ListCharactersController();

routes.post("/", createCharacterController.handle);
routes.get("/", listCharactersController.handle);

export { routes as charactersRoutes };