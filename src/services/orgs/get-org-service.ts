import { verify } from "jsonwebtoken";
import { OrgRepository } from "../../repositories/org-repository";
import { env } from "../../env";
import { OrgNotFound } from "../../errors/org-not-found";

export class GetOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(orgId: string) {
    const id = verify(orgId, env.JWT_SECRET);
    
    const org = await this.orgRepository.findById(id.sub);

    if(!org) throw new OrgNotFound("Organização não encontrada");

    return {
      org,
    };
  }
}
