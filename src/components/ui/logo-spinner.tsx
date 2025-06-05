import { cn } from "@/lib/utils/class-utils";
import { Loader } from "lucide-react";

interface LogoSpinnerProps {
  className?: string;
}

export function LogoSpinnerComponent({ className }: LogoSpinnerProps) {
	return (
		<div className={cn("relative size-24 flex items-center justify-center", className)}>
			<Loader className="w-full h-full text-primary animate-spin" />
		</div>
	);
}
