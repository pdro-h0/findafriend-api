import { it, describe, expect, beforeEach } from "vitest"
import { InMemoryPetRepository } from "../../repositories/in-memory-repository/pet-in-memory-repository"
import { GetPetDetailsService } from "./get-pet-details-service"

let inMemoryPetRepository: InMemoryPetRepository;
let sut:GetPetDetailsService

describe("GET PET DETAILS", () =>{
    beforeEach(async() =>{
        inMemoryPetRepository = new InMemoryPetRepository();
        sut = new GetPetDetailsService(inMemoryPetRepository);
    })

    it("should be able to get pet details", async() =>{
        await inMemoryPetRepository.registerPet({
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

        const { pet } = await sut.execute("3")

        expect(pet.name).toEqual("dog-3");
    })
})