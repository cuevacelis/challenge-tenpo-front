import {
	type AnyZodObject,
	ZodDefault,
	ZodEffects,
	ZodOptional,
	ZodString,
} from "zod";

/**
 * Returns true if the field is required and must not be empty (min(1)) in the given Zod schema.
 * If the field is optional, it will never be required.
 * Supports ZodObject and ZodEffects<ZodObject>.
 * Usage:
 *   isFieldRequired(personalInformationSchema, "nombres")
 */
export const isFieldRequired = (
	schema: AnyZodObject | ZodEffects<AnyZodObject>,
	field: string,
): boolean => {
	// Desenrollar ZodEffects hasta llegar al objeto base
	let baseSchema = schema;
	while (baseSchema instanceof ZodEffects) {
		baseSchema = baseSchema._def.schema;
	}
	const fieldSchema = (baseSchema.shape as Record<string, unknown>)[field];
	// Si es opcional o tiene valor por defecto, no es requerido
	if (fieldSchema instanceof ZodOptional || fieldSchema instanceof ZodDefault) {
		return false;
	}
	// Si es string, solo será required si tiene min(1) o es email
	if (fieldSchema instanceof ZodString) {
		const checks = fieldSchema._def.checks as {
			kind: string;
			value?: number;
		}[];
		const hasMin = checks.some(
			(check) =>
				check.kind === "min" && check.value !== undefined && check.value >= 1,
		);
		const hasEmail = checks.some((check) => check.kind === "email");
		return hasMin || hasEmail;
	}
	return false;
};
