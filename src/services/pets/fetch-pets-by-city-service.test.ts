import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryPetRepository } from "../../repositories/in-memory-repository/pet-in-memory-repository";
import { FetchPetByCityService } from "./fetch-pets-by-city-service";

let inMemoryPetRepository: InMemoryPetRepository;
let sut: FetchPetByCityService;

describe("FETCH PET BY CITY", () => {
  beforeEach(async () => {
    inMemoryPetRepository = new InMemoryPetRepository();
    sut = new FetchPetByCityService(inMemoryPetRepository);
  });

  it("should be able to fetch pets by city name", async () => {
    inMemoryPetRepository.registerPet({
      id: "1",
      orgId: "org-1",
      name: "dog-1",
      about: "test dog",
      cityName: "city-1",
      caracteristics: {
        age: "adult",
        energyLevel: "high",
        independencyLevel: "high",
        size: "normal",
      },
      environment: "wide",
      photo: ["teste.png"],
      requirement: ["requirement-1", "requirement-2"],
    });
    inMemoryPetRepository.registerPet({
      id: "2",
      orgId: "org-1",
      name: "dog-2",
      about: "test dog",
      cityName: "city-2",
      caracteristics: {
        age: "adult",
        energyLevel: "high",
        independencyLevel: "high",
        size: "normal",
      },
      environment: "wide",
      photo: ["teste.png"],
      requirement: ["requirement-1", "requirement-2"],
    });
    inMemoryPetRepository.registerPet({
      id: "3",
      orgId: "org-1",
      name: "dog-3",
      about: "test dog",
      cityName: "city-2",
      caracteristics: {
        age: "adult",
        energyLevel: "high",
        independencyLevel: "high",
        size: "normal",
      },
      environment: "wide",
      photo: ["teste.png"],
      requirement: ["requirement-1", "requirement-2"],
    });

    const { pet } = await sut.execute("city-2");

    expect(pet).toHaveLength(2);
    expect(pet).toEqual([
      expect.objectContaining({ name: "dog-2" }),
      expect.objectContaining({ name: "dog-3" }),
    ]);
  });
});
