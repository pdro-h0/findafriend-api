import { randomUUID } from "crypto";
import { orgData, OrgRepository } from "../org-repository";
import { Org, Prisma } from "@prisma/client";

export class InMemroyOrgRepository implements OrgRepository {
  public orgs: orgData[] = [];
  async findById(orgId: string) {
     const org = await this.orgs.find((item) => item.id === orgId);

     if (!org) return null;

     return org;
  }

  async findByName(name: string) {
    const org = await this.orgs.find((item) => item.orgName === name);

    if (!org) return null;

    return org;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const org = await this.orgs.find(
      (item) => item.phoneNumber === phoneNumber
    );

    if (!org) return null;

    return org;
  }

  async findByEmail(email: string) {
    const org = await this.orgs.find((item) => item.email === email);

    if (!org) return null;

    return org;
  }

  async register(data: Prisma.OrgCreateInput) {
    const newOrg: orgData = {
      id: data.id ?? randomUUID(),
      personInCharge: data.personInCharge,
      orgName: data.orgName,
      email: data.email,
      cep: data.cep,
      address: data.address,
      phoneNumber: data.phoneNumber,
      password: data.password,
    };

    this.orgs.push(newOrg);

    return newOrg;
  }
}
