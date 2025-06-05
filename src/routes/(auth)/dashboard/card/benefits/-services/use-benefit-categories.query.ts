import { axiosTenpoApi } from "@/lib/api/general/api-tenpo";
import { handleAxiosError } from "@/lib/api/utils";
import { useQuery } from "@tanstack/react-query";

export interface IFetchResponseBenefitCategories {
	categories: {
		id: string;
		name: string;
		displayName: string;
		iconName: string;
		color: string;
	}[];
}

interface IProps {
	config?: {
		enabled?: boolean;
		staleTime?: number;
		gcTime?: number;
	};
}

//Query keys factory
export const fetchBenefitCategoriesQueryKeys = {
	all: ["benefit-categories"] as const,
};

//Fetch function
export const fetchBenefitCategories = async () => {
	try {
		const response = await axiosTenpoApi.get<IFetchResponseBenefitCategories>(
			"/benefits/categories",
		);
		return response.data;
	} catch (error) {
		return Promise.reject(handleAxiosError(error));
	}
};

export function useBenefitCategories(props: IProps) {
	return useQuery({
		queryKey: fetchBenefitCategoriesQueryKeys.all,
		queryFn: fetchBenefitCategories,
		enabled: props.config?.enabled,
		gcTime: props.config?.gcTime,
		staleTime: props.config?.staleTime,
	});
}
