import { LayoutLogged } from "@/components/layout/layout-logged/layout-logged";
import { SiteHeader } from "@/components/layout/layout-logged/components/site-header";
import { NotFound } from "@/components/page/not-found";
import PageLoading from "@/components/page/page-loading";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { formatDateTime } from "@/lib/utils/date-utils";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Defines the route for pages that require authentication.
 * Uses the LayoutAuth component as the main layout.
 * Handles authentication and permission checks before loading the route.
 */
export const Route = createFileRoute("/(auth)")({
	beforeLoad: ({ context, location }) => {
		// Check authentication first
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
	},
	component: LayoutAuth,
	notFoundComponent: () => <NotFound />,
	pendingComponent: () => <PageLoading />,
});

/**
 * Layout for authenticated routes.
 * Provides sidebar, top bar, and footer for the main application layout.
 * Renders the React Router Outlet component to display child routes.
 * @returns The layout for authenticated routes.
 */
function LayoutAuth() {
	return (
		<SidebarProvider>
			<LayoutLogged variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<Outlet />
				<footer className="mt-4 w-full p-2 text-center text-sm bg-linear-to-t from-gray-100 via-gray-100 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent">
					<div className="relative">
						<p className="text-sm text-muted-foreground">
							©
							{formatDateTime({
								format: "yyyy",
							})}{" "}
							TENPO
						</p>
					</div>
				</footer>
			</SidebarInset>
		</SidebarProvider>
	);
}
