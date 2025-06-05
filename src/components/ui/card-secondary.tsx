import { cn } from "@/lib/utils/class-utils";
import { Card, CardContent } from "./card";

interface CardSecondaryProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
	className?: string;
}

export function CardSecondary({ children, className }: CardSecondaryProps) {
	return (
		<Card
			className={cn(
				"bg-white/5 border-white/10 dark:bg-dark-100 dark:border-dark-200",
				className,
			)}
		>
			{children}
		</Card>
	);
}

export function CardSecondaryContent({
	children,
	className,
}: React.ComponentProps<"div">) {
	return (
		<CardContent className={cn(className)}>
			{children}
		</CardContent>
	);
}
