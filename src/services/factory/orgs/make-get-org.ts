import { PrismaOrgRepository } from "../../../repositories/prisma/org-prisma-repository";
import { GetOrgService } from "../../orgs/get-org-service";

export const makeGetOrg = () => {
  const prismaOrgRepository = new PrismaOrgRepository();
  const getOrgService = new GetOrgService(prismaOrgRepository);

  return getOrgService;
};
