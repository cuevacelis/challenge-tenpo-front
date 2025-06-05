import { Page } from "@/components/page/page";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { LoginForm } from "./-components/login-form/login-form";
import logo from "@/assets/img/logo/logo-md.png";
import imagePhone from "@/assets/img/login/phone-login.png";
import { Image } from "@unpic/react";

//Route
export const Route = createFileRoute("/(not-auth)/login/")({
	validateSearch: z.object({
		redirect: z.string().optional().catch(""),
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: search.redirect ?? "/dashboard" });
		}
	},
	component: LoginPage,
});

function LoginPage() {
	return (
		<Page
			title="Iniciar Sesión"
			description="Ingresa a tu cuenta usando tu correo institucional"
			className="min-h-screen grid lg:grid-cols-2 bg-gray-100 p-0 dark:bg-gray-900 m-0"
		>
			<section className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<Image
							width={40}
							height={40}
							src={logo}
							alt="Logo"
							layout="constrained"
						/>
						Tenpo
					</Link>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						<LoginForm />
					</div>
				</div>
			</section>
			<div className="relative hidden lg:block">
				<Image
					src={imagePhone}
					alt="Phone"
					className="object-contain max-h-screen w-full p-10"
					layout="fullWidth"
				/>
			</div>
		</Page>
	);
}
