import { RequestHandler } from "express";
import { z } from "../../../../lib/zod";
import { makeRegisterOrg } from "../../../services/factory/orgs/make-register-org";
import { DuplicatedOrg } from "../../../errors/duplicated-org";

export const registerOrgController: RequestHandler = async (req, res) => {
  const registerOrgBodySchema = z.object({
    personInCharge: z.string(),
    orgName: z.string(),
    email: z.string().email(),
    cep: z.string().min(9),
    address: z.string(),
    phoneNumber: z.string(),
    password: z.string().min(5),
  });

  const bodySchema = registerOrgBodySchema.safeParse(req.body);

  if (!bodySchema.success) {
    return res.status(400).json({ error: bodySchema.error.issues });
  }

  try {
    const registerOrgService = makeRegisterOrg();

    const { newOrg } = await registerOrgService.execute(bodySchema.data);

    return res.status(201).json({ ...newOrg, id: undefined });
  } catch (error) {
    if (error instanceof DuplicatedOrg) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(400).json({ error: "algo deu errado" });
  }
};
