import { it, describe, expect, beforeEach } from "vitest"
import { InMemroyOrgRepository } from "../../repositories/in-memory-repository/org-in-memory-repository"
import { RegisterOrgService } from "./register-org-service"

let inMemroyOrgRepository: InMemroyOrgRepository
let sut: RegisterOrgService

describe("REGISTER ORG", () =>{
    beforeEach(async() =>{
        inMemroyOrgRepository = new InMemroyOrgRepository();
        sut = new RegisterOrgService(inMemroyOrgRepository);
    })

    it("should be able to register a org", async() =>{
        const { newOrg } = await sut.execute({
          id: "1",
          personInCharge: "Fulano",
          orgName: "animalandia",
          email: "email@email.com",
          cep: "11111-111",
          address: "rua tal",
          phoneNumber: "2222222-2222",
          password: "12345",
        });

        expect(newOrg.orgName).toEqual("animalandia")
    })
})