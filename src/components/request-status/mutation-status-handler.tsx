import ErrorBoundary from "@/components/error/error-boundary";
import { ModalMixedResults } from "@/components/modals/modal-mixed-results";
import { SessionExpiredModalComponent } from "@/components/modals/modal-session-expired";
import { UnauthorizedModalComponent } from "@/components/modals/modal-unauthorized";
import { SatelliteSendData } from "@/components/motion/stallite-send-data";
import { isSessionExpiredError, isUnauthorizedError } from "@/lib/api/utils";
import type { ErrorQuery } from "@/lib/custom-error/error-query";
import type { UseMutationResult } from "@tanstack/react-query";
import type React from "react";
import { useCallback } from "react";
import { ModalError } from "../modals/modal-error";
import { ModalLoading } from "../modals/modal-loading";
import { ModalSuccess } from "../modals/modal-success";
import { ErrorMessage } from "../validate/message/error-message";
import type { IMixedMessageItem } from "../validate/message/mixed-message";

interface IMutationStatusHandlerProps<
	TError extends ErrorQuery | Error,
	TContext = unknown,
> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mutations: UseMutationResult<unknown, TError, any, TContext>[];
	hideLoadingModal?: boolean;
	hideSuccessModal?: boolean;
	hideErrorModal?: boolean;
	children: React.ReactNode;
	additionalLoadingMessage?: string;
	onSuccessInModal?: () => void;
	onErrorInModal?: () => void;
}

export function MutationStatusHandler<
	TError extends ErrorQuery | Error,
	TContext = unknown,
>({
	mutations,
	hideLoadingModal = false,
	hideSuccessModal = false,
	hideErrorModal = false,
	children,
	additionalLoadingMessage,
	onSuccessInModal,
	onErrorInModal,
}: IMutationStatusHandlerProps<TError, TContext>) {
	const hasSessionExpired = mutations.some(
		(mutation) => mutation.isError && isSessionExpiredError(mutation.error),
	);
	const hasUnauthorized = mutations.some(
		(mutation) => mutation.isError && isUnauthorizedError(mutation.error),
	);

	// Status of the mutations
	const isPending = mutations.some((mutation) => mutation.status === "pending");
	const hasError = mutations.some((mutation) => mutation.status === "error");
	const hasSuccess = mutations.some(
		(mutation) => mutation.status === "success",
	);

	const shouldShowLoadingModal = isPending && !hideLoadingModal;
	const shouldShowMixedResultsModal =
		!shouldShowLoadingModal && hasError && hasSuccess;
	const shouldShowErrorModal =
		!shouldShowLoadingModal &&
		hasError &&
		!shouldShowMixedResultsModal &&
		!hideErrorModal;
	const shouldShowSuccessModal =
		!shouldShowLoadingModal &&
		!shouldShowErrorModal &&
		hasSuccess &&
		!shouldShowMixedResultsModal &&
		!hideSuccessModal;

	const successMessages = getSuccessMsg(mutations);
	const errorMessages = getErrorMsg(mutations);
	const mixedMessages: IMixedMessageItem[] = getMixedMessages(mutations);

	const resetMutations = useCallback(() => {
		for (const mutation of mutations) {
			mutation.reset();
		}
	}, [mutations]);

	if (hasSessionExpired) {
		return <SessionExpiredModalComponent />;
	}

	if (hasUnauthorized) {
		return <UnauthorizedModalComponent />;
	}

	return (
		<ErrorBoundary
			fallback={
				<ErrorMessage message="Ha ocurrido un error inesperado al enviar los datos. Por favor, intente nuevamente." />
			}
		>
			{children}

			<ModalLoading
				open={shouldShowLoadingModal}
				message={
					<span className="flex flex-row items-center gap-1">
						<SatelliteSendData className="mr-2 size-5" /> Enviando datos...
					</span>
				}
				messageSecondary={additionalLoadingMessage}
			/>

			<ModalSuccess
				onOpen={shouldShowSuccessModal}
				msgAditionalSuccess={successMessages}
				onClose={() => {
					resetMutations();
					if (onSuccessInModal) {
						onSuccessInModal();
					}
				}}
			/>

			<ModalError
				onOpen={shouldShowErrorModal}
				msgAditionalError={errorMessages}
				onClose={() => {
					resetMutations();
					if (onErrorInModal) {
						onErrorInModal();
					}
				}}
			/>

			<ModalMixedResults
				onOpen={shouldShowMixedResultsModal}
				mixedMessages={mixedMessages}
				onClose={() => {
					resetMutations();
					if (onErrorInModal) {
						onErrorInModal();
					}
				}}
			/>
		</ErrorBoundary>
	);
}

function getSuccessMsg(
	mutations?: IMutationStatusHandlerProps<ErrorQuery | Error>["mutations"],
) {
	if (!mutations?.length) return "¡No hay datos disponibles!";

	const messages = mutations
		.filter((mutation) => mutation.status === "success")
		.flatMap((mutation) => {
			const data = mutation.data;
			return data && typeof data === "object" && "mensaje" in data
				? [String(data.mensaje)]
				: [];
		});

	return messages.length
		? messages.length === 1
			? messages[0]
			: messages
		: "¡Operación completada con éxito!";
}

function getErrorMsg(
	mutations?: IMutationStatusHandlerProps<ErrorQuery | Error>["mutations"],
): string[] | string {
	if (!mutations?.length) return "¡Un error desconocido ocurrió!";

	const messages = mutations
		.filter((mutation) => mutation.status === "error")
		.flatMap((mutation) =>
			mutation.error instanceof Error ? [mutation.error.message] : [],
		);

	return messages.length
		? messages.length === 1
			? messages[0]
			: messages
		: "¡Un error desconocido ocurrió!";
}

function getMixedMessages(
	mutations?: IMutationStatusHandlerProps<ErrorQuery | Error>["mutations"],
): IMixedMessageItem[] {
	if (!mutations?.length) return [];

	// Primero agregar los mensajes de éxito
	const successItems: IMixedMessageItem[] = mutations
		.filter((mutation) => mutation.status === "success")
		.flatMap((mutation) => {
			const data = mutation.data;
			if (data && typeof data === "object" && "mensaje" in data) {
				return [
					{
						message: String(data.mensaje),
						isError: false,
					},
				];
			}
			return [];
		});

	// Luego agregar los mensajes de error
	const errorItems: IMixedMessageItem[] = mutations
		.filter((mutation) => mutation.status === "error")
		.flatMap((mutation) => {
			if (mutation.error instanceof Error) {
				return [
					{
						message: mutation.error.message,
						isError: true,
					},
				];
			}
			return [];
		});

	// Si no hay mensajes específicos, agregar mensajes genéricos
	if (successItems.length === 0 && errorItems.length === 0) {
		const hasSuccess = mutations.some(
			(mutation) => mutation.status === "success",
		);
		const hasError = mutations.some((mutation) => mutation.status === "error");

		if (hasSuccess) {
			successItems.push({
				message: "¡Operación completada con éxito!",
				isError: false,
			});
		}

		if (hasError) {
			errorItems.push({
				message: "¡Un error desconocido ocurrió!",
				isError: true,
			});
		}
	}

	// Combinar y devolver todos los mensajes (primero los éxitos, luego los errores)
	return [...successItems, ...errorItems];
}
