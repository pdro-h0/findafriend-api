import { RequestHandler } from "express";
import { z } from "../../../../lib/zod";
import { makeFetchPetByCityService } from "../../../services/factory/pets/make-fetch-pet-by-city";
import { PetNotFound } from "../../../errors/pet-not-found";

export const fetchByCityController: RequestHandler = async (req, res) => {
  const fetchByCityParamSchema = z.object({
    cityName: z.string(),
  });

  const paramSchema = fetchByCityParamSchema.safeParse(req.params);

  if (!paramSchema.success) {
    return res.status(400).json({ error: paramSchema.error.issues });
  }

  try {
    const fetchByCityService = makeFetchPetByCityService();

    const { cityName } = paramSchema.data;

    const { pet } = await fetchByCityService.execute(cityName);

    return res.json({ pet });
  } catch (error) {
    if(error instanceof PetNotFound){
      return res.status(404).json({ message: error.message })
    }

    return res.status(400).json(error);
  }
};
