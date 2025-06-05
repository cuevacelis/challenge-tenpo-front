import logo from "@/assets/img/logo/principal.svg";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { FlickeringGrid } from "../magicui/flickering-grid";
import { HyperText } from "../magicui/hyper-text";
import { Page } from "./page";

export function NotFound() {
	return (
		<Page
			title="404 | TENPO"
			description="Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que haya sido eliminada o que nunca haya existido."
			className="min-h-screen flex items-center justify-center m-0"
		>
			<FlickeringGrid
				className="absolute inset-0 z-0 size-full"
				squareSize={4}
				gridGap={6}
				color="#6B7280"
				maxOpacity={0.2}
				flickerChance={0.3}
			/>
			<section className="max-w-2xl shadow-xl text-center relative">
				<div>
					<Image
						src={logo}
						alt="Logo"
						className="flex flex-col h-24 object-contain mx-auto"
						layout="fullWidth"
					/>
					<HyperText
						animateOnHover={false}
						className="text-2xl md:text-4xl mt-4"
					>
						Página no encontrada
					</HyperText>
				</div>

				<p className="text-lg text-muted-foreground">
					Lo que buscas no existe aún, puedes volver al{" "}
					<Link to="/" className="text-primary">
						Inicio
					</Link>
				</p>
			</section>
		</Page>
	);
}
