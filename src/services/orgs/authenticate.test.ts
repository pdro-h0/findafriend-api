import { describe, vitest, expect, beforeEach, it } from "vitest";
import { InMemroyOrgRepository } from "../../repositories/in-memory-repository/org-in-memory-repository";
import { AuthenticateOrgService } from "./authenticate-org";
import { hash } from "bcryptjs";

let inMemroyOrgRepository: InMemroyOrgRepository;
let sut: AuthenticateOrgService;

describe("AUTHENTICATE", () => {
  beforeEach(async () => {
    inMemroyOrgRepository = new InMemroyOrgRepository();
    sut = new AuthenticateOrgService(inMemroyOrgRepository);
  });

  it("Should be able to authenticate a org", async () => {
    const orgCreated = await inMemroyOrgRepository.register({
      personInCharge: "Fulano",
      orgName: "Teste",
      email: "teste@email.com",
      cep: "1111-11",
      address: "Rua Tal",
      phoneNumber: "0000-0000",
      password: await hash("12345", 6),
    });

    console.log(inMemroyOrgRepository);

    const { org } = await sut.execute("teste@email.com", "12345");

    expect(org).toEqual(
      expect.objectContaining({ personInCharge: "Fulano" }),
    );
  });
});
