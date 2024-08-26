import { RequestHandler } from "express";
import { z } from "../../../../lib/zod";
import { makeAuthenticateOrg } from "../../../services/factory/orgs/make-authenticate-org";
import { sign } from "jsonwebtoken";
import { env } from "../../../env";
import { OrgNotFound } from "../../../errors/org-not-found";
import { InvalidCredentials } from "../../../errors/invalid-credentials";

export const authenticateController: RequestHandler = async (req, res) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
  });

  const bodySchema = authenticateBodySchema.safeParse(req.body);

  if (!bodySchema.success) {
    return res.status(400).json({ error: bodySchema.error.issues });
  }

  try {
    const authenticateService = makeAuthenticateOrg();

    const { email, password } = bodySchema.data;

    const { org } = await authenticateService.execute(email, password);

    const token = sign({}, env.JWT_SECRET, {
      subject: org.id,
      expiresIn: "30m",
    });

    const refreshToken = sign({}, env.JWT_SECRET, {
      subject: org.id,
      expiresIn: "1d",
    });

    return res
      .cookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .json({ token });
  } catch (error) {
    if (error instanceof OrgNotFound) {
      return res.status(404).json({ error: error.message });
    } else if (error instanceof InvalidCredentials) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(400).json({ error: "Algo deu errado" });
  }
};
