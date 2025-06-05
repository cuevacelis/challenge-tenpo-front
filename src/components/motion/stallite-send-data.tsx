import { cn } from "@/lib/utils/class-utils";
import { motion } from "motion/react";

interface SatelliteSendDataProps {
	size?: number;
	className?: string;
}

export function SatelliteSendData({
	size = 24,
	className,
}: SatelliteSendDataProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("lucide lucide-satellite-dish", className)}
			role="presentation"
		>
			<path d="M4 10a7.31 7.31 0 0 0 10 10Z" />
			<path d="m9 15 3-3" />
			<motion.path
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.5,
					ease: "easeOut",
					repeat: Number.POSITIVE_INFINITY,
					repeatDelay: 0.5,
				}}
				d="M17 13a6 6 0 0 0-6-6"
			/>
			<motion.path
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.5,
					ease: "easeOut",
					repeat: Number.POSITIVE_INFINITY,
					repeatDelay: 0.5,
					delay: 0.5,
				}}
				d="M21 13A10 10 0 0 0 11 3"
			/>
		</svg>
	);
}
