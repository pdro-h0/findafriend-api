import { Org, Prisma } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { db } from "../../../lib/prisma";

export class PrismaOrgRepository implements OrgRepository {
  async findById(orgId: string) {
    const org = await db.org.findUnique({
      where: {
        id: orgId,
      },
    });

    return org;
  }

  async findByName(name: string) {
    const org = await db.org.findUnique({
      where: {
        orgName: name,
      },
    });

    return org;
  }
  async findByPhoneNumber(phoneNumber: string) {
    const org = await db.org.findUnique({
      where: {
        phoneNumber,
      },
    });

    return org;
  }
  async findByEmail(email: string) {
    const org = await db.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }
  async register(data: Prisma.OrgUncheckedCreateInput) {
    const newOrg = await db.org.create({
      data,
    });

    return newOrg;
  }
}
