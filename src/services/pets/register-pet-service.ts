import { Prisma } from "@prisma/client";
import { PetRepository } from "../../repositories/pet-repository";

export class RegisterPetService {
  constructor(private petRepository: PetRepository) {}

  async execute(data: Prisma.PetUncheckedCreateInput) {
    const newPet = await this.petRepository.registerPet(data);

    return {
      newPet,
    };
  }
}
