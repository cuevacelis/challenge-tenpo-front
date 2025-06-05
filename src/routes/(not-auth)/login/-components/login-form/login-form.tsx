import { useAppForm } from "@/components/form/hooks/use-form";
import { cn } from "@/lib/utils/class-utils";
import { loginFormSchema } from "./-schemas/login.schema";
import { SubscribeButton } from "@/components/form/components/subscribe-button";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/context/auth/useAuth";
import { useLoginMutation } from "./mutation/use-login.mutation";
import { MutationStatusHandler } from "@/components/request-status/mutation-status-handler";
import { LoadingProgressModal } from "@/components/modals/modal-login-progress";
import { ErrorMessage } from "@/components/validate/message/error-message";

export function LoginForm({ className }: React.ComponentProps<"form">) {
	const { login } = useAuth();
	const loginMutation = useLoginMutation();
	const router = useRouter();
	const routerState = useRouterState({
		select: (state) => state.status,
	});
	const routerToLocation = useRouterState({
		select: (state) => state.location?.pathname,
	});

	const isLoginPending =
		loginMutation.isPending ||
		(routerState === "pending" && routerToLocation === "/dashboard");

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: { onChange: loginFormSchema },
		onSubmit: ({ value }) => {
			loginMutation.mutate(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: (dataResponseLogin) => {
						void login(dataResponseLogin);
						void router.invalidate();
					},
				},
			);
		},
	});

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Iniciar sesión</h1>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-3">
					<form.AppField name="email">
						{(field) => (
							<field.TextField
								label="Correo electrónico"
								schema={loginFormSchema}
								inputProps={{
									placeholder: "m@example.com",
								}}
							/>
						)}
					</form.AppField>
				</div>

				<div className="grid gap-3">
					<form.AppField name="password">
						{(field) => (
							<field.TextField
								label="Contraseña"
								schema={loginFormSchema}
								inputProps={{
									placeholder: "********",
								}}
							/>
						)}
					</form.AppField>
				</div>

				<MutationStatusHandler
					mutations={[loginMutation]}
					hideErrorModal
					hideSuccessModal
					hideLoadingModal
				>
					{loginMutation.error && (
						<ErrorMessage
							message={loginMutation.error?.message}
							className="justify-center"
						/>
					)}
					<form.AppForm>
						<SubscribeButton
							label="Iniciar sesión"
							icon="log-in"
							variant="default"
							className="w-full"
						/>
					</form.AppForm>
					<LoadingProgressModal
						isPending={isLoginPending}
						isAuthSuccess={loginMutation.isSuccess}
					/>
				</MutationStatusHandler>
			</div>
		</form>
	);
}
