import { verify } from "jsonwebtoken";
import { OrgRepository } from "../../repositories/org-repository";
import { env } from "../../env";
import { OrgNotFound } from "../../errors/org-not-found";

export class GetOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(orgId: string) {
    const org = await this.orgRepository.findById(orgId);

    if(!org) throw new OrgNotFound("Organização não encontrada");

    return {
      org,
    };
  }
}
