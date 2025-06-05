import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { IDataUrlsLogged } from "../services/query/data-fake-urls.query";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "@tanstack/react-router";

interface INavManagementCardProps {
	items: IDataUrlsLogged["navManagementCard"];
}

export function NavManagementCard({ items }: INavManagementCardProps) {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Tarjetas</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild>
							<Link to={item.url}>
								<DynamicIcon name={item.icon} />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
