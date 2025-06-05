"use client";

import type * as React from "react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { IDataUrlsLogged } from "../services/query/data-fake-urls.query";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "@tanstack/react-router";

interface INavControlProps {
	items: IDataUrlsLogged["navControl"];
	className?: string;
}

export function NavControl({
	items,
	className,
	...props
}: INavControlProps & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarGroupLabel>Control</SidebarGroupLabel>
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
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
