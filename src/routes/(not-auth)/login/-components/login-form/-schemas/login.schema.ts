import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.union([z.string().email(), z.literal("")]),
	password: z.string(),
});
