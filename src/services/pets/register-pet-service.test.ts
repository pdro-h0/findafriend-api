import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryPetRepository } from "../../repositories/in-memory-repository/pet-in-memory-repository";
import { RegisterPetService } from "./register-pet-service";

let inMemoryPetRepository: InMemoryPetRepository;
let sut: RegisterPetService;

describe("REGISTER PET", () => {
  beforeEach(async () => {
    inMemoryPetRepository = new InMemoryPetRepository();
    sut = new RegisterPetService(inMemoryPetRepository);
  });

  it("should register a pet", async () => {
    const { newPet } = await sut.execute({
      id: "1",
      orgId: "org-1",
      name: "Zeus",
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

    expect(newPet.requirement).toHaveLength(2);
    expect(newPet.requirement).toEqual(["requirement-1", "requirement-2"]);
  });
});
