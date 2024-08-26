import { InvalidCredentials } from "../../errors/invalid-credentials";
import { OrgNotFound } from "../../errors/org-not-found";
import { OrgRepository } from "../../repositories/org-repository";
import { compare } from "bcryptjs";

export class AuthenticateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(email: string, password: string) {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new OrgNotFound("Organização não encontrada");
    }

    const doesPasswordMathes = await compare(password, org.password);

    if (!doesPasswordMathes) {
      throw new InvalidCredentials("Senha ou Email incorretos");
    }

    return {
      org,
    };
  }
}
