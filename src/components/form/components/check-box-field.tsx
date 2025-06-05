import { Checkbox } from "@/components/ui/checkbox";
import { ErrorMessage } from "@/components/validate/message/error-message";
import { cn } from "@/lib/utils/class-utils";
import { isFieldRequired } from "@/lib/utils/zod-utils";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ReactNode } from "react";
import type { AnyZodObject, ZodEffects } from "zod";
import { useFieldContext } from "../hooks/use-form-context";
import { mapErrorMessages } from "../utils/field-utils";
import { RequiredLabel } from "./required-label";
interface CheckBoxFieldProps {
	label?: ReactNode;
	name?: string;
	className?: string;
	labelProps?: React.ComponentProps<"label">;
	checkboxProps?: React.ComponentProps<typeof CheckboxPrimitive.Root>;
	isHideErrorMessage?: boolean;
	isShowIconError?: boolean;
	required?: boolean;
	schema?: AnyZodObject | ZodEffects<AnyZodObject>;
}

/**
 * CheckBoxField component for form input with label, error message, and optional error icon.
 * Integrates with form context and supports custom label and checkbox props.
 *
 * @example
 * <CheckBoxField label="Accept terms" name="terms" />
 */
export function CheckBoxField({
	label,
	name,
	className,
	labelProps,
	checkboxProps,
	isHideErrorMessage,
	isShowIconError = false,
	required,
	schema,
}: CheckBoxFieldProps) {
	const field = useFieldContext<boolean>();
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
			<div className={cn("flex items-center space-x-2")}>
				<Checkbox
					id={nameField}
					name={nameField}
					checked={field.state.value}
					onCheckedChange={(checked) => {
						field.handleChange(Boolean(checked));
					}}
					aria-checked={field.state.value}
					aria-invalid={Boolean(isError)}
					{...checkboxProps}
				/>
				{label && (
					<RequiredLabel
						htmlFor={nameField}
						className={labelProps?.className}
						hideAsterisk={!isRequired}
						{...labelProps}
					>
						{label}
					</RequiredLabel>
				)}
			</div>
			{!isHideErrorMessage && (
				<ErrorMessage
					message={errorMessage}
					className="mt-1 ml-5"
					isShowIcon={isShowIconError}
				/>
			)}
		</section>
	);
}
