import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PiggyBank } from "lucide-react";
import { NavUser } from "./components/nav-user";
import { NavMain } from "./components/nav-main";
import { NavManagementCard } from "./components/nav-management";
import { NavControl } from "./components/nav-control";
import { dataUrlsLogged } from "./services/query/data-fake-urls.query";
import { Link } from "@tanstack/react-router";

export function LayoutLogged({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link to="/">
								<PiggyBank className="!size-5" />
								<span className="text-base font-semibold">TENPO</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<Separator
					orientation="horizontal"
					decorative={true}
					className="bg-gray-700"
				/>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={dataUrlsLogged.navMain} />
				<NavManagementCard items={dataUrlsLogged.navManagementCard} />
				<NavControl items={dataUrlsLogged.navControl} className="mt-auto" />
			</SidebarContent>

			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
