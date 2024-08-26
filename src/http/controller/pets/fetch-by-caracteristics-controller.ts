import { RequestHandler } from "express";
import { z } from "../../../../lib/zod";
import { makeFetchPetByCaracteristcsService } from "../../../services/factory/pets/make-fetch-pet-by-caracteristics";
import { PetNotFound } from "../../../errors/pet-not-found";

export const fetchByCaracteristicsController: RequestHandler = async (
  req,
  res
) => {
  const fetchByCaracteristicsBodySchema = z.object({
    age: z.enum(["puppy", "adult", "old"]).optional(),
    energyLevel: z.enum(["low", "normal", "high"]).optional(),
    independencyLevel: z.enum(["low", "normal", "high"]).optional(),
    size: z.enum(["small", "normal", "big"]).optional(),
  });

  const fetchByCaracteristicsParamSchema = z.object({
    cityName: z.string(),
  });

  const bodySchema = fetchByCaracteristicsBodySchema.safeParse(req.body);
  const paramSchema = fetchByCaracteristicsParamSchema.safeParse(req.params);

  if (!bodySchema.success || !paramSchema.success) {
    return res
      .status(400)
      .json({
        bodyError: bodySchema.error?.issues,
        paramError: paramSchema.error?.issues,
      });
  }

  try {
    const fetchByCaracteristicsService = makeFetchPetByCaracteristcsService();

    const { age, energyLevel, independencyLevel, size } = bodySchema.data;

    const { cityName } = paramSchema.data;

    const { pet } = await fetchByCaracteristicsService.execute(cityName, {
      age,
      energyLevel,
      independencyLevel,
      size,
    });

    return res.json({ pet });
  } catch (error) {
    return res.status(400).json(error);
  }
};
