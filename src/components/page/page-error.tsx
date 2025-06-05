import { Page } from "@/components/page/page";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type ErrorRouteComponent, Link } from "@tanstack/react-router";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { FlickeringGrid } from "../magicui/flickering-grid";
import { AnimatedSpan, Terminal, TypingAnimation } from "../magicui/terminal";
import { ErrorMessage } from "../validate/message/error-message";

interface RouteError {
	statusText?: string;
	message?: string;
	stack?: string;
}

export function ErrorPage({
	error: routerError,
}: Parameters<ErrorRouteComponent>[0]) {
	const error: RouteError = {
		message:
			routerError instanceof Error
				? routerError.message
				: typeof routerError === "string"
					? routerError
					: "Ha ocurrido un error inesperado en la aplicación",
		stack: routerError instanceof Error ? routerError.stack : undefined,
	};

	const reloadPage = () => {
		window.location.reload();
	};

	return (
		<Page
			title="¡Oops! Algo salió mal"
			description="Ha ocurrido un error inesperado en la aplicación"
			className="min-h-screen flex items-center justify-center bg-background m-0 p-4"
		>
			<FlickeringGrid
				className="absolute inset-0 z-0 size-full"
				squareSize={4}
				gridGap={6}
				color="#741e1e"
				maxOpacity={0.5}
				flickerChance={0.3}
			/>
			<Card className="shadow-lg w-md lg:w-lg border-1 border-dashed border-destructive relative overflow-hidden">
				<CardHeader className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="bg-destructive/10 p-2 rounded-full">
							<AlertCircle className="size-6 text-destructive" />
						</div>
						<CardTitle className="text-xl">¡Oops! Algo salió mal</CardTitle>
					</div>
					<CardDescription className="text-sm">
						Lamentamos los inconvenientes. Se ha producido un error inesperado.
						Si el problema persiste, te recomendamos limpiar la caché de tu
						navegador.
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<Terminal className="max-h-[200px] overflow-auto">
						<TypingAnimation>&gt; script run errors:audit</TypingAnimation>

						<AnimatedSpan delay={1000} className="text-destructive">
							<span>✔ Detecting errors</span>
						</AnimatedSpan>

						<AnimatedSpan delay={1500} className="text-destructive">
							<span>✔ Error details:</span>
							<ErrorMessage
								message={
									error?.statusText ??
									error?.message ??
									error?.stack ??
									"No se proporcionaron detalles adicionales del error."
								}
							/>
						</AnimatedSpan>

						<TypingAnimation delay={2000} className="text-muted-foreground">
							Finished.
						</TypingAnimation>
					</Terminal>
				</CardContent>

				<CardFooter className="flex flex-col gap-3 pt-2">
					<Button onClick={reloadPage} className="w-full" size="lg">
						<RefreshCw className="size-4" />
						Recargar la página
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link to="/" className="w-full">
							<Home className="size-4" />
							Volver a la página principal
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</Page>
	);
}
