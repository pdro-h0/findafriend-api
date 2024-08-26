import { PrismaOrgRepository } from "../../../repositories/prisma/org-prisma-repository";
import { RegisterOrgService } from "../../orgs/register-org-service";

export const makeRegisterOrg = () => {
  const prismaOrgRepository = new PrismaOrgRepository();
  const registerOrgService = new RegisterOrgService(prismaOrgRepository);

  return registerOrgService;
};
