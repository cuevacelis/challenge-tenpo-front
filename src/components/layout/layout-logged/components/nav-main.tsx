import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { IDataUrlsLogged } from "../services/query/data-fake-urls.query";

interface INavMainProps {
	items: IDataUrlsLogged["navMain"];
}
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "@tanstack/react-router";

export function NavMain({ items }: INavMainProps) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title} asChild>
								<Link to={item.url}>
									<DynamicIcon name={item.icon} />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
