import { PrismPetRepository } from "../../../repositories/prisma/pet-prisma-repository";
import { FetchPetByCaracteristicsService } from "../../pets/fetch-pets-by-caracteristics-service";

export const makeFetchPetByCaracteristcsService = () => {
  const prismPetRepository = new PrismPetRepository();
  const fetchPetByCaracteristcsService = new FetchPetByCaracteristicsService(
    prismPetRepository
  );

  return fetchPetByCaracteristcsService;
};
