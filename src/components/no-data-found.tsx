import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/class-utils";
import { SearchX } from "lucide-react";
import { motion } from "motion/react";

interface NoDataFoundProps {
	message?: string;
	submessage?: string;
	messageButton?: string;
	className?: string;
	onReset?: () => void;
	showResetButton?: boolean;
}

export function NoDataFound({
	message = "No se encontraron datos",
	submessage = "Intenta ajustar tus filtros o criterios de búsqueda",
	messageButton = "Restablecer filtros",
	className,
	onReset,
	showResetButton = false,
}: NoDataFoundProps) {
	return (
		<Card className={cn("border-2 border-dashed", className)}>
			<CardContent className="flex flex-col items-center justify-center text-center p-6 sm:p-10">
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 20,
						duration: 0.5,
					}}
				>
					<div className="bg-accent rounded-full p-4">
						<SearchX className="size-12 sm:size-16 text-primary/80" />
					</div>
				</motion.div>

				<motion.div
					className="mt-6 space-y-2 max-w-md"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<h3 className="text-lg sm:text-xl font-semibold text-foreground">
						{message}
					</h3>
					<p className="text-sm text-muted-foreground">{submessage}</p>

					{showResetButton && onReset && (
						<motion.div
							initial={{ y: 10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.3 }}
							className="pt-4"
						>
							<Button variant="outline" onClick={onReset} className="mt-2">
								{messageButton}
							</Button>
						</motion.div>
					)}
				</motion.div>
			</CardContent>
		</Card>
	);
}
