import { cn } from "@/lib/utils/class-utils";
import { Card, CardContent } from "./card";

interface CardPrimaryProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
	className?: string;
}

export function CardPrimary({ children, className }: CardPrimaryProps) {
	return (
		<Card
			className={cn(
				"bg-gradient-to-r from-tenpo-green to-emerald-400 border-0 text-tenpo-dark",
				className,
			)}
		>
			{children}
		</Card>
	);
}

export function CardPrimaryContent({
	children,
	className,
}: React.ComponentProps<"div">) {
	return (
		<CardContent className={cn("p-inherit sm:p-6", className)}>
			{children}
		</CardContent>
	);
}
