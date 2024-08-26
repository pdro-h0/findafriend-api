import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../../env";

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authToken.split(" ")[1];

  try {
    const { sub } = verify(token, env.JWT_SECRET);

    req.orgId = sub;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
