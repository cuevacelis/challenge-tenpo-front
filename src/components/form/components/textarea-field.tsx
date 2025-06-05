import { RequiredLabel } from "@/components/form/components/required-label";
import { ErrorMessage } from "@/components/validate/message/error-message";
import { cn } from "@/lib/utils/class-utils";
import { isFieldRequired } from "@/lib/utils/zod-utils";
import type { ReactNode } from "react";
import type { AnyZodObject, ZodEffects } from "zod";
import { useFieldContext } from "../hooks/use-form-context";
import { mapErrorMessages } from "../utils/field-utils";

interface TextareaFieldProps {
	label: ReactNode;
	name?: string;
	className?: string;
	labelProps?: React.ComponentProps<"label">;
	textareaProps?: React.ComponentProps<"textarea">;
	required?: boolean;
	isShowIconError?: boolean;
	schema?: AnyZodObject | ZodEffects<AnyZodObject>;
}

/**
 * TextareaField component for form input with label, error message, and required asterisk.
 * Shows required indicator based on prop or Zod schema.
 *
 * @example
 * <TextareaField label="Description" name="description" schema={mySchema} />
 */
export function TextareaField({
	label,
	name,
	className,
	labelProps,
	textareaProps,
	required,
	isShowIconError = false,
	schema,
}: TextareaFieldProps) {
	const field = useFieldContext<string>();
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
				<textarea
					id={nameField}
					name={nameField}
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					className={cn(
						"block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-y",
						textareaProps?.className,
						{
							"border-red-500": isError,
							"focus-visible:border-destructive": isError,
						},
					)}
					aria-invalid={isError ? "true" : undefined}
					aria-describedby={isError ? `${nameField}-error` : undefined}
					{...textareaProps}
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
