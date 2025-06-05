import ErrorBoundary from "@/components/error/error-boundary";
import { ModalLoading } from "@/components/modals/modal-loading";
import { NoDataFound } from "@/components/no-data-found";
import { useGlobalModal } from "@/context/global-modals/useGlobalModal";
import { isSessionExpiredError, isUnauthorizedError } from "@/lib/api/utils";
import type { UseQueryResult } from "@tanstack/react-query";
import { ErrorMessage } from "../validate/message/error-message";

interface IQueryStatusHandlerProps {
	children?: React.ReactNode;
	queries: UseQueryResult<unknown, Error>[];
	hideLoadingModal?: boolean;
	hideNoDataMessage?: boolean;
	hideErrorMessage?: boolean;
	loadingType?: "isLoading" | "isFetching";
}

export function QueryStatusHandler({
	children,
	queries,
	hideLoadingModal = false,
	hideNoDataMessage = false,
	hideErrorMessage = false,
	loadingType = "isFetching",
}: IQueryStatusHandlerProps) {
	const isLoading = queries.some((query) => query[loadingType]);
	const isPaused = queries.some((query) => query.fetchStatus === "paused");
	const isError = queries.some((query) => query.isError);
	const isFetchedAfterMount = queries.some(
		(query) => query.isFetchedAfterMount,
	);
	const isSessionExpired = queries.some(
		(query) => query.isError && isSessionExpiredError(query.error),
	);
	const isUnauthorized = queries.some(
		(query) => query.isError && isUnauthorizedError(query.error),
	);
	const isData = queries.some(
		(query) =>
			query?.data &&
			(Array.isArray(query.data)
				? query.data.length > 0
				: Object.keys(query.data).length > 0),
	);

	const shouldShowLoadingModal = !hideLoadingModal && isLoading;
	const shouldShowOfflineModal = isPaused;
	const shouldShowNoDataMessage =
		!hideNoDataMessage && !isLoading && isFetchedAfterMount && !isData;
	const shouldShowErrorModal = !hideErrorMessage && !isLoading && isError;

	useGlobalModal({
		sessionExpired: {
			isOpen: isSessionExpired,
		},
		unauthorized: {
			isOpen: isUnauthorized,
		},
		offline: {
			isOpen: shouldShowOfflineModal,
		},
	});

	if (shouldShowNoDataMessage) {
		return <NoDataFound />;
	}

	if (shouldShowErrorModal) {
		return <ErrorMessage message={getErrorMsgs(queries)} />;
	}

	return (
		<ErrorBoundary
			fallback={
				<ErrorMessage message="Ha ocurrido un error inesperado al cargar los datos. Por favor, intente nuevamente." />
			}
		>
			{children}

			<ModalLoading open={shouldShowLoadingModal} />
		</ErrorBoundary>
	);
}

function getErrorMsgs(
	queries?: IQueryStatusHandlerProps["queries"],
): string[] | string {
	if (!queries?.length) return "¡Un error desconocido ocurrió!";

	const messages = queries
		.filter((query) => query.isError)
		.flatMap((query) => {
			const error = query.error;
			return error instanceof Error ? [error.message] : [];
		});

	return messages.length
		? messages.length === 1
			? messages[0]
			: messages
		: "¡Un error desconocido ocurrió!";
}
