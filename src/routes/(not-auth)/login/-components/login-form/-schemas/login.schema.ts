import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email().min(1, "El correo electrónico es requerido"),
	password: z
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(20, "La contraseña debe tener menos de 20 caracteres"),
});
