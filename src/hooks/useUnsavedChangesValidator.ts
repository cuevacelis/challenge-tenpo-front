import { useCallback, useRef, useState } from "react";

export interface UnsavedChangesValidatorProps {
	onConfirm?: () => void;
	onCancel?: () => void;
}

export interface UnsavedChangesValidatorReturn {
	isConfirmationModalOpen: boolean;
	setIsConfirmationModalOpen: (isOpen: boolean) => void;
	validateBeforeAction: (
		hasUnsavedChanges: boolean,
		action?: () => void,
	) => boolean;
	handleConfirm: () => void;
	handleCancel: () => void;
}

/**
 * Hook personalizado para gestionar la validación de cambios no guardados
 *
 * Este hook proporciona una forma segura de manejar acciones que podrían
 * resultar en pérdida de datos no guardados, mostrando un modal de confirmación
 * cuando sea necesario.
 *
 * @example
 * ```tsx
 * const {
 *   isConfirmationModalOpen,
 *   validateBeforeAction,
 *   handleConfirm,
 *   handleCancel
 * } = useUnsavedChangesValidator({
 *   onConfirm: () => console.log('Acción confirmada'),
 *   onCancel: () => console.log('Acción cancelada')
 * });
 *
 * // Uso en un componente
 * const handleSave = () => {
 *   validateBeforeAction(formHasChanges, () => {
 *     // Lógica para guardar cambios
 *   });
 * };
 * ```
 */
export function useUnsavedChangesValidator(
	props?: UnsavedChangesValidatorProps,
): UnsavedChangesValidatorReturn {
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false);
	const pendingActionRef = useRef<(() => void) | null>(null);

	const { onConfirm: externalOnConfirm, onCancel: externalOnCancel } =
		props ?? {};

	const validateBeforeAction = useCallback(
		(hasUnsavedChanges: boolean, action?: () => void): boolean => {
			if (hasUnsavedChanges) {
				pendingActionRef.current = action ?? null;
				setIsConfirmationModalOpen(true);
				return false;
			}

			action?.();
			return true;
		},
		[],
	);

	const handleConfirm = useCallback(() => {
		setIsConfirmationModalOpen(false);

		if (pendingActionRef.current) {
			pendingActionRef.current();
			pendingActionRef.current = null;
		}

		externalOnConfirm?.();
	}, [externalOnConfirm]);

	const handleCancel = useCallback(() => {
		setIsConfirmationModalOpen(false);
		pendingActionRef.current = null;

		externalOnCancel?.();
	}, [externalOnCancel]);

	return {
		isConfirmationModalOpen,
		setIsConfirmationModalOpen,
		validateBeforeAction,
		handleConfirm,
		handleCancel,
	};
}
