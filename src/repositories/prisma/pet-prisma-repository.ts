import { Prisma } from "@prisma/client";
import { filterCaracteristic, PetRepository } from "../pet-repository";
import { db } from "../../../lib/prisma";

export class PrismPetRepository implements PetRepository {
  async registerPet(data: Prisma.PetUncheckedCreateInput) {
    const newPet = await db.pet.create({
      data: {
        ...data,
        photo: data.photo,
        requirement: data.requirement,
      },
    });

    return newPet;
  }

  async fetchPetByCity(cityName: string) {
    const pets = await db.pet.findMany({
      where: {
        cityName,
      },
    });

    return pets;
  }

  async fetchPetByCaracteristics(
    cityName: string,
    { age, energyLevel, independencyLevel, size }: Partial<filterCaracteristic>
  ) {
    const petsPrisma = await db.pet.findMany({
      where: {
        cityName,
      },
    });

    const pets = petsPrisma.filter((pet) => {
      const isAgeMatch = age ? pet.age === age : true;

      const isEnergyLevelMatch = energyLevel
        ? pet.energyLevel === energyLevel
        : true;

      const isIndependencyLevelMatch = independencyLevel
        ? pet.independencyLevel === independencyLevel
        : true;

      const isSizeMatch = size ? pet.size === size : true;

      return (
        isAgeMatch &&
        isEnergyLevelMatch &&
        isIndependencyLevelMatch &&
        isSizeMatch
      );
    });

    return pets;
  }

  async getPet(petId: string) {
    const pet = await db.pet.findUnique({
      where: {
        id: petId,
      },
      include:{
        org:{
          select:{
            address: true,
            orgName: true,
            phoneNumber: true
          }
        }
      }
    });

    return pet;
  }
}
