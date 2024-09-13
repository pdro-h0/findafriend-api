import { describe, it, expect, beforeEach } from "vitest";
import { InMemroyOrgRepository } from "../../repositories/in-memory-repository/org-in-memory-repository";
import { GetOrgService } from "./get-org-service";

let inMemroyOrgRepository: InMemroyOrgRepository;
let sut: GetOrgService;

describe("GET ORG", () => {
  beforeEach(async () => {
    inMemroyOrgRepository = new InMemroyOrgRepository();
    sut = new GetOrgService(inMemroyOrgRepository);
  });

  it("should get org", async () => {
    await inMemroyOrgRepository.register({
      id: "1",
      personInCharge: "Fulano",
      orgName: "Teste",
      email: "teste@email.com",
      cep: "1111-11",
      address: "Rua Tal",
      phoneNumber: "0000-0000",
      password: "12345",
    });

    const { org } = await sut.execute("1");

    expect(org.orgName).toEqual("Teste");
  });
});
