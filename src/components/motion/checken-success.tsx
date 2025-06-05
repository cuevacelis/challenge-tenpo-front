"use client";

import { cn } from "@/lib/utils/class-utils";
import { motion } from "motion/react";

interface AnimatedCheckSuccessProps {
	size?: number;
	className?: string;
}

export function AnimatedCheckSuccess({
	size = 24,
	className,
}: AnimatedCheckSuccessProps) {
	const svgVariants = {
		initial: { scale: 0, duration: 0 },
		animate: {
			scale: 1,
			transition: {
				duration: 0.5,
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 1,
			},
		},
	};

	const pathVariants = {
		initial: { pathLength: 0, duration: 0 },
		animate: {
			pathLength: 1,
			transition: {
				duration: 0.8,
				ease: "easeInOut",
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 0.7,
			},
		},
	};

	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={"currentColor"}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("lucide lucide-circle-check-big", className)}
			variants={svgVariants}
			initial="initial"
			animate="animate"
			role="presentation"
		>
			{/* Circle */}
			<path d="M21.801 10A10 10 0 1 1 17 3.335" />
			{/* Check */}
			<motion.path
				d="m9 11 3 3L22 4"
				data-animated="check"
				variants={pathVariants}
			/>
		</motion.svg>
	);
}
