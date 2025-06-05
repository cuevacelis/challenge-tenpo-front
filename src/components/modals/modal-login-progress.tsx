import { BlurFade } from "@/components/magicui/blur-fade";
import { WordRotate } from "@/components/magicui/word-rotate";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Shield } from "lucide-react";

interface ILoadingProgressModalProps {
	isPending: boolean;
	isAuthSuccess?: boolean;
}

/**
 * Modal component that displays login progress with animated UI elements
 * Shows a spinner, animated title, and rotating status messages during authentication
 */
export function LoadingProgressModal({
	isPending,
	isAuthSuccess,
}: ILoadingProgressModalProps) {
	return (
		<Dialog modal={true} open={isPending || isAuthSuccess}>
			<DialogContent className="sm:max-w-[425px] [&>button:last-child]:hidden">
				<DialogHeader className="sr-only">
					<DialogTitle>Login</DialogTitle>
					<DialogDescription>Cargando información...</DialogDescription>
				</DialogHeader>

				<section className="flex flex-col items-center justify-center space-y-4">
					<BlurFade delay={0.1} duration={0.6}>
						{/* Icono animado */}
						<section className="relative">
							<div
								className={
									"absolute inset-0 rounded-full animate-ping opacity-20 bg-primary"
								}
							/>
							<div
								className={
									"relative p-4 rounded-full bg-gradient-to-br from-background to-muted border-2 shadow-lg"
								}
							>
								<Shield className={"size-8 text-primary"} />
							</div>
						</section>
					</BlurFade>

					{isAuthSuccess ? (
						<section className="space-y-3 flex flex-col items-center justify-center">
							<BlurFade delay={0.3} duration={0.6}>
								<h3 className="text-xl font-semibold text-center text-green-600 dark:text-green-400">
									Autenticación exitosa
								</h3>
							</BlurFade>
							<BlurFade
								delay={0.5}
								duration={0.8}
								className="border border-border/50 bg-accent rounded-xl px-2 py-2"
							>
								<p className="text-sm font-normal text-muted-foreground text-center">
									Redirigiendo
								</p>
							</BlurFade>
						</section>
					) : (
						<section className="space-y-3 flex flex-col items-center justify-center">
							<BlurFade delay={0.3} duration={0.6}>
								<h3 className="text-xl font-semibold text-center text-black dark:text-white">
									Iniciando sesión
								</h3>
							</BlurFade>

							<BlurFade
								delay={0.5}
								duration={0.8}
								className="border border-border/50 bg-accent rounded-xl px-2"
							>
								<WordRotate
									words={[
										"🔗 Estableciendo conexión segura",
										"🔒 Verificando credenciales",
										"⏳ Espere un momento",
									]}
									duration={2000}
									className="text-sm font-normal text-muted-foreground"
								/>
							</BlurFade>
						</section>
					)}
				</section>
			</DialogContent>
		</Dialog>
	);
}
