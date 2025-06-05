import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface IPropsTanstackQuery {
	children: React.ReactNode;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			gcTime: 0,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

/**
 * TanstackQueryProvider
 * ---------------------------------------------
 * Provides the React Query context to the application using TanStack Query.
 * Configures a global QueryClient with custom default options for queries,
 * and includes ReactQueryDevtools for debugging query state during development.
 *
 * QueryClient configuration:
 * - staleTime: 0 (data is considered stale immediately)
 * - gcTime: 0 (cache garbage collection is immediate)
 * - refetchOnWindowFocus: false (no refetch on window focus)
 * - retry: false (queries will not retry on failure)
 *
 * Props:
 * - children: React nodes to be rendered within the provider context.
 *
 * Includes:
 * - ReactQueryDevtools: Devtools panel for inspecting query state, initially closed.
 *
 */
export function TanstackQueryProvider({ children }: IPropsTanstackQuery) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
