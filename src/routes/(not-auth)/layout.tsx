import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * Defines the route for pages that do not require authentication.
 * Uses the LayoutNotAuth component as the main layout.
 */
export const Route = createFileRoute("/(not-auth)")({
	component: LayoutNotAuth,
});

/**
 * Layout for routes that do not require authentication.
 * Renders the React Router Outlet component to display child routes.
 * @returns The layout for non-authenticated routes.
 */
function LayoutNotAuth() {
	return <Outlet />;
}
