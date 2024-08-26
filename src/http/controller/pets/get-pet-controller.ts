import { RequestHandler } from "express";
import { z } from "../../../../lib/zod";
import { makeGetPet } from "../../../services/factory/pets/make-get-pet";
import { PetNotFound } from "../../../errors/pet-not-found";

export const getPetController: RequestHandler = async (req, res) => {
  const getPetParamShema = z.object({
    petId: z.string().uuid(),
  });

  const paramSchema = getPetParamShema.safeParse(req.params);

  if (!paramSchema.success) {
    return res.status(400).json({ error: paramSchema.error.issues });
  }

  try {
    const getPetService = makeGetPet();

    const { petId } = paramSchema.data;

    const { pet } = await getPetService.execute(petId);

    return res.json({ ...pet, orgId: undefined });
  } catch (error) {
    if (error instanceof PetNotFound) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(400).json({ error: "algo deu errado" });
  }
};
