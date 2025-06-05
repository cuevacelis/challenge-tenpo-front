import type { IconName } from "lucide-react/dynamic";

export interface IDataUrlsLogged {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
	navMain: {
		title: string;
		url: string;
		icon: IconName;
	}[];
	navManagementCard: {
		title: string;
		icon: IconName;
		url: string;
	}[];
	navControl: {
		title: string;
		icon: IconName;
		url: string;
	}[];
}

export const dataUrlsLogged: IDataUrlsLogged = {
	user: {
		name: "Juan Perez",
		email: "juan.perez@example.com",
		avatar: "/avatars/juan.perez.png",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: "layout-dashboard",
		},
	],
	navManagementCard: [
		{
			title: "Pagar tarjeta",
			url: "/dashboard/card/pay-card",
			icon: "credit-card",
		},
		{
			title: "Beneficios",
			url: "/dashboard/card/benefits",
			icon: "gift",
		},
	],
	navControl: [
		{
			title: "Estado de cuenta",
			url: "/dashboard/account/account-status",
			icon: "credit-card",
		},
	],
};
