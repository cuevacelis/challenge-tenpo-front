import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth/useAuth";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils/class-utils";
import { useRouter } from "@tanstack/react-router";
import { Clock, LogOut } from "lucide-react";
import { useState } from "react";

export function SessionExpiredModalComponent() {
	const { logout } = useAuth();
	const router = useRouter();
	const [openModal, setOpenModal] = useState<boolean>(true);
	const [count] = useCountdown({
		countStart: 10,
		intervalMs: 1000,
		autoStart: true,
		countStop: 0,
	});

	const handleLogout = () => {
		setOpenModal(false);
		logout();
		void router.invalidate();
	};

	if (count === 0 && openModal) {
		handleLogout();
	}

	const progressPercentage = (count / 10) * 100;

	return (
		<Dialog modal={true} open={openModal}>
			<DialogContent className="[&>button:last-child]:hidden">
				<DialogHeader>
					<DialogTitle className="text-xl flex flex-row items-center gap-2">
						<Clock className="size-5 text-destructive" />
						Sesión Expirada
					</DialogTitle>
					<DialogDescription className="sr-only">
						Tu sesión ha expirado. Serás redirigido a la página de inicio de
						sesión.
					</DialogDescription>
				</DialogHeader>

				<Separator />

				<section className="py-4 space-y-4">
					<p className="text-sm text-muted-foreground">
						Tu sesión ha expirado. Serás redirigido a la página de inicio de
						sesión en:
					</p>

					<div className="flex flex-col space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-base font-medium">
								<span
									className={cn(
										"text-lg font-bold",
										count <= 3 ? "text-destructive animate-pulse" : "",
									)}
								>
									{count}
								</span>{" "}
								segundos
							</span>
							{count > 0 && (
								<span className="text-xs text-muted-foreground">
									Redireccionando automáticamente...
								</span>
							)}
						</div>
						<Progress value={progressPercentage} />
					</div>

					<div className="bg-muted/50 p-3 rounded-md border border-muted">
						<p className="text-sm">
							Para continuar con tu actividad, necesitarás iniciar sesión
							nuevamente. Tus datos no guardados podrían perderse.
						</p>
					</div>
				</section>

				<DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
					<Button
						onClick={handleLogout}
						className="w-full"
						variant="destructive"
					>
						<LogOut className="size-4" />
						Iniciar sesión nuevamente
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
