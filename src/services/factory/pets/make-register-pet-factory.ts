import { PrismPetRepository } from "../../../repositories/prisma/pet-prisma-repository";
import { RegisterPetService } from "../../pets/register-pet-service";

export const makeRegisterPetFactory = () => {
  const prismaPetRepository = new PrismPetRepository();
  const registerPetService = new RegisterPetService(prismaPetRepository);

  return registerPetService;
};
