import { RequestHandler } from "express";
import { z } from "../../../../lib/zod";;
import { makeGetOrg } from "../../../services/factory/orgs/make-get-org";
import { OrgNotFound } from "../../../errors/org-not-found";

export const getOrgController: RequestHandler = async (req, res) => {
  const getOrgBodySchema = z.object({
    orgId: z.string(),
  });

  const bodySchema = getOrgBodySchema.safeParse(req.body);

  if (!bodySchema.success) {
    return res.status(400).json({ error: bodySchema.error.issues });
  }

  try {
    const { orgId } = bodySchema.data;

    const getOrgService = makeGetOrg();

    const { org } = await getOrgService.execute(orgId);

    return res.json({ org });
  } catch (error) {
    if (error instanceof OrgNotFound) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(400).json({ error: "Algo deu errado" });
  }
};
