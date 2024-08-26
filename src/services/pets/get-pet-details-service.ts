import { PetNotFound } from "../../errors/pet-not-found";
import { PetRepository } from "../../repositories/pet-repository";

export class GetPetDetailsService {
  constructor(private petRepository: PetRepository) {}

  async execute(petId: string) {
    const pet = await this.petRepository.getPet(petId);

    if(!pet) throw new PetNotFound("Pet não encontrado")

    return {
      pet,
    };
  }
}
