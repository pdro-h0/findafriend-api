import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryPetRepository } from "../../repositories/in-memory-repository/pet-in-memory-repository";
import { FetchPetByCaracteristicsService } from "./fetch-pets-by-caracteristics-service";

let inMemoryPetRepository: InMemoryPetRepository;
let sut: FetchPetByCaracteristicsService;

describe("FETCH PET BY CARACTERISTICS", () => {
  beforeEach(async () => {
    inMemoryPetRepository = new InMemoryPetRepository();
    sut = new FetchPetByCaracteristicsService(inMemoryPetRepository);
  });

  it("should be able to fetch pets by city name", async () => {
    inMemoryPetRepository.registerPet({
      id: "1",
      orgId: "org-1",
      name: "dog-1",
      about: "test dog",
      cityName: "city-1",
      age: "adult",
      energyLevel: "high",
      independencyLevel: "high",
      size: "normal",
      environment: "wide",
      photo: "teste.png",
      requirement: "requirement-1",
    });
    inMemoryPetRepository.registerPet({
      id: "2",
      orgId: "org-1",
      name: "dog-2",
      about: "test dog",
      cityName: "city-2",
      age: "old",
      energyLevel: "high",
      independencyLevel: "high",
      size: "normal",
      environment: "wide",
      photo: "teste.png",
      requirement: "requirement-1",
    });
    inMemoryPetRepository.registerPet({
      id: "3",
      orgId: "org-1",
      name: "dog-3",
      about: "test dog",
      cityName: "city-2",
      age: "puppy",
      energyLevel: "high",
      independencyLevel: "high",
      size: "normal",
      environment: "wide",
      photo: "teste.png",
      requirement: "requirement-1",
    });
    inMemoryPetRepository.registerPet({
      id: "4",
      orgId: "org-1",
      name: "dog-4",
      about: "test dog",
      cityName: "city-2",
      age: "puppy",
      size: "small",
      energyLevel: "high",
      independencyLevel: "high",
      environment: "wide",
      photo: "teste.png",
      requirement: "requirement-1",
    });

    const { pet } = await sut.execute("city-2", {
      age: "puppy",
    });

    expect(pet).toHaveLength(2);
    expect(pet).toEqual([
      expect.objectContaining({ name: "dog-3" }),
      expect.objectContaining({ name: "dog-4" }),
    ]);
  });
});
