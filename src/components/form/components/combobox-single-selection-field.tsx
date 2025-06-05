import {
	ComboboxSingleSelection,
	type OptionComboboxSingleSelection,
} from "@/components/combobox/combobox-single-selection";
import { ErrorMessage } from "@/components/validate/message/error-message";
import { cn } from "@/lib/utils/class-utils";
import { isFieldRequired } from "@/lib/utils/zod-utils";
import type { ReactNode } from "react";
import type { AnyZodObject, ZodEffects } from "zod";
import { useFieldContext } from "../hooks/use-form-context";
import { mapErrorMessages } from "../utils/field-utils";
import { RequiredLabel } from "./required-label";

interface ComboboxSingleSelectionFieldProps {
	label?: ReactNode;
	name?: string;
	placeholder?: string;
	options?: OptionComboboxSingleSelection[];
	className?: string;
	disabled?: boolean;
	labelProps?: React.ComponentProps<"label">;
	comboboxProps?: React.ComponentProps<typeof ComboboxSingleSelection>;
	required?: boolean;
	isShowIconError?: boolean;
	schema?: AnyZodObject | ZodEffects<AnyZodObject>;
}

/**
 * ComboboxSingleSelectionField component for form input with label, error message, and required asterisk.
 * Shows required indicator based on prop or Zod schema.
 *
 * @example
 * <ComboboxSingleSelectionField label="Country" name="country" options={options} schema={mySchema} />
 */
export function ComboboxSingleSelectionField({
	label,
	name,
	options,
	placeholder,
	className,
	disabled = false,
	labelProps,
	comboboxProps,
	required,
	isShowIconError = false,
	schema,
}: ComboboxSingleSelectionFieldProps) {
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
				<ComboboxSingleSelection
					options={options}
					value={field.state.value}
					onSelect={(value) => field.handleChange(value)}
					onBlur={() => field.handleBlur()}
					placeholder={placeholder}
					disabled={disabled}
					className={cn(comboboxProps?.className, {
						"text-red-500": isError,
						"border-red-500": isError,
						"focus-visible:border-destructive": isError,
					})}
					{...comboboxProps}
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
