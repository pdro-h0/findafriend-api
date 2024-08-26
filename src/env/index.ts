import "dotenv/config";

import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z.enum(["test", "dev", "production"]).default("dev"),
  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environments", _env.error.format());

  throw new Error(`Invalid environments, ${_env.error.format()}`);
}

export const env = _env.data;
