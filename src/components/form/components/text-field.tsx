import { RequiredLabel } from "@/components/form/components/required-label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/validate/message/error-message";
import { cn } from "@/lib/utils/class-utils";
import { isFieldRequired } from "@/lib/utils/zod-utils";
import type { ReactNode } from "react";
import type { AnyZodObject, ZodEffects } from "zod";
import { useFieldContext } from "../hooks/use-form-context";
import { mapErrorMessages } from "../utils/field-utils";

interface TextFieldProps {
	label: ReactNode;
	name?: string;
	className?: string;
	labelProps?: React.ComponentProps<"label">;
	inputProps?: React.ComponentProps<"input">;
	required?: boolean;
	isShowIconError?: boolean;
	schema?: AnyZodObject | ZodEffects<AnyZodObject>;
}

/**
 * TextField component for form input with label, error message, and required asterisk.
 * Shows required indicator based on prop or Zod schema.
 *
 * @example
 * <TextField label="Name" name="name" schema={mySchema} />
 */
export function TextField({
	label,
	name,
	className,
	labelProps,
	inputProps,
	required,
	isShowIconError = false,
	schema,
}: TextFieldProps) {
	const field = useFieldContext<string>();
	/**
	 * nameField determines the field name to be used for:
	 *  - the htmlFor attribute of the label,
	 *  - the id and name of the input,
	 *  - and for required validation using the isFieldRequired helper.
	 *
	 * Logic:
	 * - If the 'name' prop is provided, it is used directly.
	 * - Otherwise, the field name is taken from the form context (field.name).
	 * - If the name is nested (e.g., "guardians[0].nombreApoderado"), only the last segment ("nombreApoderado") is extracted.
	 *   This is important because the required helper expects the simple field name, not the full path.
	 * - If there is no dot, the name is used as is.
	 *
	 * This way, the component works correctly for both simple fields and nested fields in arrays or objects.
	 */
	const nameField = name ?? field.name?.split(".").pop() ?? field.name;
	const isError = field.state.meta.isTouched && field.state.meta.errors.length;
	const errorMessage = isError
		? mapErrorMessages(field.state.meta.errors)
		: null;

	const isRequired =
		required ?? !!(schema && isFieldRequired(schema, nameField));

	return (
		<section className={cn(className)}>
			<div className="space-y-2">
				<RequiredLabel
					htmlFor={nameField}
					className={labelProps?.className}
					hideAsterisk={!isRequired}
					{...labelProps}
				>
					{label}
				</RequiredLabel>
				<Input
					id={nameField}
					name={nameField}
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					className={cn(inputProps?.className, {
						"border-red-500": isError,
						"focus-visible:border-destructive": isError,
					})}
					{...inputProps}
				/>
			</div>
			<ErrorMessage
				message={errorMessage}
				className="mt-1"
				isShowIcon={isShowIconError}
			/>
		</section>
	);
}
