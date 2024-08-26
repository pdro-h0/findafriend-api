import { PetNotFound } from "../../errors/pet-not-found";
import {
  filterCaracteristic,
  PetRepository,
} from "../../repositories/pet-repository";

export class FetchPetByCaracteristicsService {
  constructor(private petRepository: PetRepository) {}

  async execute(cityName: string, caracteristic: Partial<filterCaracteristic>) {
     const pet = await this.petRepository.fetchPetByCaracteristics(
      cityName,
      caracteristic
    );

    return {
      pet,
    };
  }
}
