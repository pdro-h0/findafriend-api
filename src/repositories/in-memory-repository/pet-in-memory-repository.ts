import { randomUUID } from "node:crypto";
import { PetRepository, filterCaracteristic, petData } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  public pets: petData[] = [];

  async getPet(petId: string) {
    const pet = this.pets.find((item) => item.id === petId);

    if (!pet) return null;

    return pet;
  }

  async fetchPetByCaracteristics(
    cityName: string,
    { age, energyLevel, independencyLevel, size }: Partial<filterCaracteristic>
  ) {
    const petsFiltered = this.pets.filter((pet) => {
      const isCityMatch = pet.cityName === cityName;

      const isAgeMatch = age ? pet.age === age : true;

      const isEnergyLevelMatch = energyLevel
        ? pet.energyLevel === energyLevel
        : true;

      const isIndependencyLevelMatch = independencyLevel
        ? pet.independencyLevel === independencyLevel
        : true;

      const isSizeMatch = size ? pet.size === size : true;

      return (
        isCityMatch &&
        isAgeMatch &&
        isEnergyLevelMatch &&
        isIndependencyLevelMatch &&
        isSizeMatch
      );
    });

    return petsFiltered;
  }

  async fetchPetByCity(cityName: string) {
    const petsFiltered = await this.pets.filter(
      (pet) => pet.cityName === cityName
    );

    return petsFiltered;
  }

  async registerPet(data: petData) {
    const newPet: petData = {
      id: data.id ?? randomUUID(),
      orgId: data.orgId ?? randomUUID(),
      name: data.name,
      about: data.about,
      cityName: data.cityName,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      independencyLevel: data.independencyLevel,
      environment: data.environment,
      photo: data.photo,
      requirement: data.requirement,
    };

    this.pets.push(newPet);

    return newPet;
  }
}
