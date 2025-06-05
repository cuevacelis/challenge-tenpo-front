import { axiosTenpoApi } from "@/lib/api/general/api-tenpo";
import { handleAxiosError } from "@/lib/api/utils";
import {
	type QueryFunctionContext,
	useInfiniteQuery,
} from "@tanstack/react-query";

interface IBodyGetAccountStatus {
	limit: number;
}

export interface IFetchResponseAccountStatus {
	totalBenefits: number;
	monthlySavings: number;
	usedBenefits: number;
	selectedType: string;
	benefits: {
		name: string;
		type: string;
		discount: number;
		description: string;
		validUntil: string;
		location: string;
		iconName: string;
	}[];
	pagination: {
		totalPages: number;
		totalItems: number;
		currentPage: number;
		itemsPerPage: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
}

interface IProps {
	params: IBodyGetAccountStatus;
	config?: {
		enabled?: boolean;
		staleTime?: number;
		gcTime?: number;
	};
}

//Query keys factory
export const fetchAccountStatusQueryKeys = {
	all: ["infinite-account-status"] as const,
	list: ({ limit }: IBodyGetAccountStatus) =>
		[...fetchAccountStatusQueryKeys.all, { limit }] as const,
};

//Fetch function
export const fetchAccountStatus = async ({
	pageParam = 1,
	queryKey,
}: QueryFunctionContext<
	ReturnType<typeof fetchAccountStatusQueryKeys.list>,
	number
>) => {
	const { limit } = queryKey[1];
	try {
		const response = await axiosTenpoApi.get<IFetchResponseAccountStatus>(
			`/credit-card/info?page=${pageParam}&limit=${limit}`,
		);
		return response.data;
	} catch (error) {
		return Promise.reject(handleAxiosError(error));
	}
};

export function useAccountStatus(props: IProps) {
	return useInfiniteQuery({
		queryKey: fetchAccountStatusQueryKeys.list(props.params),
		queryFn: fetchAccountStatus,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.currentPage + 1;
			}
			return undefined;
		},
		getPreviousPageParam: (firstPage) => {
			if (firstPage.pagination.hasPreviousPage) {
				return firstPage.pagination.currentPage - 1;
			}
			return undefined;
		},
		enabled: props.config?.enabled,
		gcTime: props.config?.gcTime,
		staleTime: props.config?.staleTime,
	});
}
