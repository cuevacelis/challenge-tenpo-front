import { axiosTenpoApi } from "@/lib/api/general/api-tenpo";
import { handleAxiosError } from "@/lib/api/utils";
import {
	type QueryFunctionContext,
	useInfiniteQuery,
} from "@tanstack/react-query";
import type { IconName } from "lucide-react/dynamic";

interface IBodyGetBenefits {
	limit: number;
	type: string;
}

export interface IFetchResponseBenefits {
	totalBenefits: number;
	monthlySavings: number;
	usedBenefits: number;
	selectedType: string;
	benefits: {
		id: string;
		name: string;
		type: string;
		discount: number;
		description: string;
		validUntil: string;
		location: string;
		iconName: IconName;
		color: string;
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
	params: IBodyGetBenefits;
	config?: {
		enabled?: boolean;
		staleTime?: number;
		gcTime?: number;
	};
}

//Query keys factory
export const fetchBenefitsQueryKeys = {
	all: ["infinite-benefits"] as const,
	list: ({ limit, type }: IBodyGetBenefits) =>
		[...fetchBenefitsQueryKeys.all, { limit, type }] as const,
};

//Fetch function
export const fetchBenefits = async ({
	pageParam = 1,
	queryKey,
}: QueryFunctionContext<
	ReturnType<typeof fetchBenefitsQueryKeys.list>,
	number
>) => {
	const { limit, type = "all" } = queryKey[1];
	try {
		const response = await axiosTenpoApi.get<IFetchResponseBenefits>(
			`/benefits?page=${pageParam}&limit=${limit}&type=${type}`,
		);
		return response.data;
	} catch (error) {
		return Promise.reject(handleAxiosError(error));
	}
};

export function useBenefits(props: IProps) {
	return useInfiniteQuery({
		queryKey: fetchBenefitsQueryKeys.list(props.params),
		queryFn: fetchBenefits,
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
