import { PrismPetRepository } from "../../../repositories/prisma/pet-prisma-repository";
import { GetPetDetailsService } from "../../pets/get-pet-details-service";

export const makeGetPet = () => {
  const prismPetRepository = new PrismPetRepository();
  const getPetDetailsService = new GetPetDetailsService(prismPetRepository);

  return getPetDetailsService;
};
