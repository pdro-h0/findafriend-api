import { PrismaOrgRepository } from "../../../repositories/prisma/org-prisma-repository"
import { AuthenticateOrgService } from "../../orgs/authenticate-org"

export const makeAuthenticateOrg = () =>{
    const prismaOrgRepository = new PrismaOrgRepository()
    const authenticateOrgService = new AuthenticateOrgService(
      prismaOrgRepository
    );

    return authenticateOrgService
}