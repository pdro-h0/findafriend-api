import { PetNotFound } from "../../errors/pet-not-found";
import { PetRepository } from "../../repositories/pet-repository";

export class FetchPetByCityService {
  constructor(private petRepository: PetRepository) {}

  async execute(cityName: string) {
    const pet = await this.petRepository.fetchPetByCity(cityName);

    if(!pet) throw new PetNotFound("Pet não encontrado")

    return {
      pet,
    };
  }
}
