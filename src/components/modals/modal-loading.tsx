import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/class-utils";
import { Landmark, Shield } from "lucide-react";

interface ModalLoadingProps {
	open?: boolean;
	message?: React.ReactNode;
	messageSecondary?: React.ReactNode;
}

export function ModalLoading({
	open = true,
	message = "🌐 Conectando con el servidor...",
	messageSecondary = "Por favor, espere mientras cargamos la información",
}: ModalLoadingProps) {
	return (
		<Dialog open={open} aria-hidden="true">
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				onCloseAutoFocus={(e) => e.preventDefault()}
				className="sm:max-w-[425px] bg-linear-to-br from-primary/5 via-background to-secondary/5 border-none shadow-lg [&>button:last-child]:hidden"
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Modal Loading</DialogTitle>
					<DialogDescription>Cargando información...</DialogDescription>
				</DialogHeader>

				<section className="flex flex-col items-center justify-center py-2 px-2 space-y-6">
					{/* Icono animado */}
					<div className="relative">
						<div
							className={cn(
								"absolute inset-0 rounded-full animate-ping opacity-20",
								"bg-primary",
							)}
						/>
						<div
							className={cn(
								"relative p-4 rounded-full bg-gradient-to-br from-background to-muted border-2",
								"shadow-lg animate-pulse",
							)}
						>
							<Landmark className={cn("h-8 w-8", "text-primary")} />
						</div>
					</div>

					{/* Barra de progreso */}
					<div className="relative h-1 w-full overflow-hidden bg-secondary mb-4">
						<div className="absolute h-full w-full bg-primary animate-progress-bar" />
					</div>

					<div className="flex flex-col items-center justify-center gap-1">
						<span className="text-lg font-medium">{message}</span>
						<p className="text-sm text-muted-foreground">{messageSecondary}</p>
					</div>

					{/* Indicador de seguridad */}
					<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-muted/30">
						<Shield className="h-3 w-3 text-green-600" />
						<span className="text-xs font-medium text-muted-foreground">
							Conexión segura SSL
						</span>
					</div>
				</section>
			</DialogContent>
		</Dialog>
	);
}
