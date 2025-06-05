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
import { LogOut, ShieldX } from "lucide-react";
import { useState } from "react";

/**
 * Modal component that displays when user lacks authorization (401 error).
 * Automatically redirects to login after 5 seconds with a specific unauthorized message.
 *
 * @example
 * <UnauthorizedModalComponent />
 */
export function UnauthorizedModalComponent() {
	const { logout } = useAuth();
	const router = useRouter();
	const [openModal, setOpenModal] = useState<boolean>(true);
	const [count] = useCountdown({
		countStart: 5, // Tiempo más corto para unauthorized
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

	const progressPercentage = (count / 5) * 100;

	return (
		<Dialog modal={true} open={openModal}>
			<DialogContent className="[&>button:last-child]:hidden">
				<DialogHeader>
					<DialogTitle className="text-xl flex flex-row items-center gap-2">
						<ShieldX className="size-5 text-destructive" />
						Acceso No Autorizado
					</DialogTitle>
					<DialogDescription className="sr-only">
						No tienes autorización para acceder a este recurso. Serás redirigido
						a la página de inicio de sesión.
					</DialogDescription>
				</DialogHeader>

				<Separator />

				<section className="py-4 space-y-4">
					<p className="text-sm text-muted-foreground">
						No tienes autorización para acceder a este recurso. Serás redirigido
						a la página de inicio de sesión en:
					</p>

					<div className="flex flex-col space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-base font-medium">
								<span
									className={cn(
										"text-lg font-bold",
										count <= 2 ? "text-destructive animate-pulse" : "",
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

					<div className="bg-destructive/10 p-3 rounded-md border border-destructive/20">
						<p className="text-sm text-destructive-foreground">
							<strong>Acceso denegado:</strong> Tu cuenta no tiene los permisos
							necesarios para realizar esta acción. Contacta al administrador si
							crees que esto es un error.
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
						Ir al inicio de sesión
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
