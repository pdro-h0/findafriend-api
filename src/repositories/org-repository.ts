import { Org, Prisma } from "@prisma/client";

export interface orgData{
    id: string;
    personInCharge: string;
    orgName: string;
    email: string;
    cep: string;
    address: string;
    phoneNumber: string
    password: string
}

export interface OrgRepository {
  register(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
  findByName(name: string): Promise<Org | null>;
  findById(orgId: string): Promise<Org | null>;
  findByPhoneNumber(phoneNumber: string): Promise<Org | null>;
}