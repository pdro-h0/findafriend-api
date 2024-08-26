import { Prisma } from "@prisma/client";
import { OrgRepository } from "../../repositories/org-repository";
import { hash } from "bcryptjs";
import { DuplicatedOrg } from "../../errors/duplicated-org";

export class RegisterOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: Prisma.OrgUncheckedCreateInput) {
    const orgWithSameEmail = await this.orgRepository.findByEmail(data.email);
    const orgWithSameName = await this.orgRepository.findByName(data.orgName);
    const orgWithSamePhoneNumber = await this.orgRepository.findByPhoneNumber(
      data.orgName
    );

    if (orgWithSameEmail || orgWithSameName || orgWithSamePhoneNumber) {
      throw new DuplicatedOrg("Organização duplicada");
    }

    const passwordHash = await hash(data.password, 6);

    const newOrg = await this.orgRepository.register({
      ...data,
      password: passwordHash,
    });

    return {
      newOrg,
    };
  }
}
