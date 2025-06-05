import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "../magicui/particles";
import { Landmark } from "lucide-react";

interface PageLoadingProps {
	message?: string;
	showProgress?: boolean;
	duration?: number;
}

/**
 * Loading page component that displays the institutional logo, a progress bar, and animated elements while the app loads.
 * Shows a customizable message and progress indicator. Uses Shadcn UI for consistent styling.
 *
 * @example
 * <PageLoading message="Loading..." showProgress duration={3000} />
 */
export default function PageLoading({
	message = "Cargando la página",
}: PageLoadingProps) {
	const { resolvedTheme } = useTheme();
	const [colorParticles, setColorParticles] = useState("#000000");

	useEffect(() => {
		setColorParticles(resolvedTheme === "dark" ? "#ffffff" : "#000000");
	}, [resolvedTheme]);

	return (
		<section
			className="fixed inset-0 flex items-center justify-center z-50 bg-muted dark:bg-black"
			role="alertdialog"
			aria-modal="true"
			aria-label="Cargando página"
		>
			<section className="max-w-2xl shadow-xl text-center flex flex-col items-center justify-center">
				<Landmark className="size-24 text-primary animate-pulse" />
				<h1 className="text-xl md:text-2xl mt-4">{message}</h1>
				<p className="text-sm text-muted-foreground mt-2">
					Espere un momento mientras cargamos la página...
				</p>
			</section>
			<Particles
				className="absolute inset-0 z-0"
				quantity={100}
				ease={80}
				color={colorParticles}
				refresh
			/>
		</section>
	);
}
