import express from "express";
import { registerPetController } from "../http/controller/pets/register-pet";
import { ensureAuthenticated } from "../http/middleware/ensure-authenticated";
// import { fetchByCityController } from "../http/controller/pets/fetch-by-city-controller";
import { fetchByCaracteristicsController } from "../http/controller/pets/fetch-by-caracteristics-controller";
import { getPetController } from "../http/controller/pets/get-pet-controller";

const route = express.Router();

route.post("/new-pet", ensureAuthenticated, registerPetController);
// route.get("/pets/:cityName", fetchByCityController);
// route.get("/pets-caracteristcs", fetchByCaracteristicsController);
route.get("/pets/:cityName", fetchByCaracteristicsController);
route.get("/pet/:petId", getPetController);

export default route;
