import { useAuth } from "@/context/auth/useAuth";
import { routeTree } from "@/routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { initialStateAuthContext } from "../auth/auth-context";

const router = createRouter({
	routeTree,
	defaultPreload: "viewport",
	scrollRestoration: true,
	context: {
		auth: initialStateAuthContext,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

/**
 * Provides the router context for the application using TanStack Router.
 * This component wraps the app with the router and injects the authentication context.
 *
 * @example
 * <RouterProviderWithContext />
 */
export function RouterProviderWithContext() {
	const auth = useAuth();

	return <RouterProvider router={router} context={{ auth }} />;
}
