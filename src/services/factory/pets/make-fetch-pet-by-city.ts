import { PrismPetRepository } from "../../../repositories/prisma/pet-prisma-repository";
import { FetchPetByCityService } from "../../pets/fetch-pets-by-city-service";

export const makeFetchPetByCityService = () => {
  const prismPetRepository = new PrismPetRepository();
  const fetchPetByCityService = new FetchPetByCityService(prismPetRepository);

  return fetchPetByCityService;
};
