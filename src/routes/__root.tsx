import { NotFound } from "@/components/page/not-found";
import { ErrorPage } from "@/components/page/page-error";
import type { AuthContextType } from "@/context/auth/auth-context";
import { GlobalModalsProvider } from "@/context/global-modals/global-modals-provider";
import { ThemeProvider } from "@/context/theme/theme-provider";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

/**
 * Router context interface for authentication context.
 * Provides the shape of the context used by the root route.
 */
interface MyRouterContext {
	auth: AuthContextType;
}

/**
 * Defines the root route for the application using TanStack Router.
 * Wraps the app with ThemeProvider, GlobalModalsProvider, and LabelInfoProvider.
 * Handles global error and not found components.
 */
export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<ThemeProvider defaultTheme="dark">
			<GlobalModalsProvider>
				<Outlet />
			</GlobalModalsProvider>
			<TanStackRouterDevtools />
		</ThemeProvider>
	),
	errorComponent: ({ error, reset }) => (
		<ErrorPage error={error} reset={reset} />
	),
	notFoundComponent: () => <NotFound />,
});
