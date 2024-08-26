import { Pet, Prisma } from "@prisma/client";

export interface petData {
  id: string;
  name: string;
  about: string;
  cityName: string;
  orgId: string;
  age: "puppy" | "adult" | "old";
  size: "small" | "normal" | "big";
  energyLevel: "low" | "normal" | "high";
  independencyLevel: "low" | "normal" | "high";
  environment: "small" | "regular" | "wide";
  photo: string;
  requirement: string;
}

export interface filterCaracteristic {
  age: "puppy" | "adult" | "old";
  size: "small" | "normal" | "big";
  energyLevel: "low" | "normal" | "high";
  independencyLevel: "low" | "normal" | "high";
}

export interface PetRepository {
  registerPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  fetchPetByCity(cityName: string): Promise<Pet[] | []>;
  fetchPetByCaracteristics(
    cityName: string,
    caracteristic: Partial<filterCaracteristic>
  ): Promise<Pet[] | []>;
  getPet(petId: string): Promise<Pet | null>;
}
