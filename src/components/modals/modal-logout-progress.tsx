import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

interface ILogoutProgressModalProps {
	isPending: boolean;
}

export function LogoutProgressModal({ isPending }: ILogoutProgressModalProps) {
	return (
		<Dialog modal={true} open={isPending}>
			<DialogContent className="sm:max-w-[425px] [&>button:last-child]:hidden">
				<DialogHeader className="sr-only">
					<DialogTitle>Cierre de Sesión</DialogTitle>
					<DialogDescription>Cerrando sesión...</DialogDescription>
				</DialogHeader>
				<section className="flex flex-col items-center justify-center py-2 space-y-2">
					<div className="relative flex items-center justify-center p-4 bg-primary/10 rounded-full">
						<LogOut
							className="h-12 w-12 text-primary animate-pulse"
							strokeWidth={1.5}
						/>
					</div>
					<h2 className="text-xl font-semibold text-foreground">
						Cerrando sesión
					</h2>

					<p className="text-sm text-muted-foreground">
						Por favor espere mientras finalizamos su sesión
					</p>
				</section>
			</DialogContent>
		</Dialog>
	);
}
