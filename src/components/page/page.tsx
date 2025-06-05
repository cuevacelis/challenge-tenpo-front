import { cn } from "@/lib/utils/class-utils";

interface IPage {
	children: React.ReactNode;
	className?: string;
	title?: string;
	description?: string;
}

export function Page({ children, className, title, description }: IPage) {
	return (
		<section
			id="page"
			className={cn("min-h-[calc(100vh-160px)] mt-8 mx-2 mb-2", className)}
		>
			<title>{title ? `${title} | TENPO` : "TENPO"}</title>
			<meta name="author" content="TENPO" />
			<meta name="description" content={description} />
			{children}
		</section>
	);
}
