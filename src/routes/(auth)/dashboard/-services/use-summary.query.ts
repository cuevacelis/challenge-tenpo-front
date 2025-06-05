import { axiosTenpoApi } from "@/lib/api/general/api-tenpo";
import { handleAxiosError } from "@/lib/api/utils";
import { useQuery } from "@tanstack/react-query";

export interface IFetchResponseSummary {
	totalBalance: number;
	currentMonthIncome: number;
	incomeChangePercentage: number;
	currentMonthExpense: number;
	expenseChangePercentage: number;
	creditCardSpent: number;
	creditCardAvailableBalance: number;
	investmentAmount: number;
	investmentChangePercentage: number;
	recentActivity: {
		type: string;
		name: string;
		amount: number;
		transactionType: string;
		date: string;
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
export const fetchSummaryQueryKeys = {
	all: ["summary"] as const,
};

//Fetch function
export const fetchSummary = async () => {
	try {
		const response = await axiosTenpoApi.get<IFetchResponseSummary>("/summary");
		return response.data;
	} catch (error) {
		return Promise.reject(handleAxiosError(error));
	}
};

export function useSummary(props: IProps) {
	return useQuery({
		queryKey: fetchSummaryQueryKeys.all,
		queryFn: fetchSummary,
		enabled: props.config?.enabled,
		gcTime: props.config?.gcTime,
		staleTime: props.config?.staleTime,
	});
}
