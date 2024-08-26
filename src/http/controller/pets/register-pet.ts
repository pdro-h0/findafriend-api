import { RequestHandler } from "express";
import { z } from "../../../../lib/zod" ;
import { makeRegisterPetFactory } from "../../../services/factory/pets/make-register-pet-factory";

export const registerPetController: RequestHandler = async (req, res) => {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    cityName: z.string(),
    environment: z.enum(["small", "regular", "wide"]),
    photo: z.string(),
    requirement: z.array(z.string()),
    age: z.enum(["puppy", "adult", "old"]),
    size: z.enum(["small", "normal", "big"]),
    energyLevel: z.enum(["low", "normal", "high"]),
    independencyLevel: z.enum(["low", "normal", "high"]),
  });

  const bodySchema = registerPetBodySchema.safeParse(req.body);

  if (!bodySchema.success) {
    return res.status(400).json({ error: bodySchema.error.issues });
  }

  try {
    const registerPetService = makeRegisterPetFactory();

    const orgId = req.orgId;

    const { newPet } = await registerPetService.execute({
      ...bodySchema.data,
      orgId,
    });

    return res.status(201).json({ newPet });
  } catch (error) {
    return res.status(400).json({ error: "algo deu errado" });
  }
};
