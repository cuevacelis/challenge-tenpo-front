import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { WifiOff } from "lucide-react";

export function ModalOffline() {
	return (
		<Dialog open={true} aria-hidden="true">
			<DialogContent className="[&>button:last-child]:hidden">
				<DialogHeader className="sr-only">
					<DialogTitle className="flex items-center gap-2 text-xl">
						<WifiOff className="size-5 text-destructive" />
						Sin conexión a internet
					</DialogTitle>
					<DialogDescription>
						No se ha detectado conexión a internet. Por favor, verifica tu
						conexión e intenta nuevamente.
					</DialogDescription>
					<Separator className="mt-4" />
				</DialogHeader>

				<section className="flex flex-col items-center justify-center py-6 text-center">
					<div className="rounded-full bg-amber-100 p-3 mb-4">
						<WifiOff className="size-9 text-amber-600" />
					</div>
					<h3 className="text-lg font-medium mb-2">
						No se ha detectado conexión a internet
					</h3>
					<p className="text-sm text-muted-foreground max-w-md">
						No podemos conectarnos a los servicios de TENPO. Por favor, verifica
						tu conexión a internet e intenta nuevamente.
					</p>
				</section>
			</DialogContent>
		</Dialog>
	);
}
