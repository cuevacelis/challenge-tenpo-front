import { Page } from "@/components/page/page";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Calendar, DollarSign, AlertCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/dashboard/card/pay-card/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [amount, setAmount] = useState("");
	const [paymentType, setPaymentType] = useState("minimum");

	return (
		<Page title="Pagar tarjeta" className="p-4 lg:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Pagar Tarjeta de Crédito</h1>
					<p className="text-gray-400">
						Gestiona los pagos de tu tarjeta de crédito
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Card Info */}
					<Card className="bg-gradient-to-r from-gray-800 to-gray-900 border-white/10">
						<CardHeader>
							<CardTitle className="flex items-center">
								<CreditCard className="mr-2 h-5 w-5 text-tenpo-green" />
								Tarjeta Tenpo Mastercard
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="bg-gradient-to-r from-tenpo-green to-emerald-400 p-6 rounded-lg text-tenpo-dark">
									<div className="flex justify-between items-start mb-4">
										<div>
											<p className="text-sm opacity-80">Saldo actual</p>
											<p className="text-2xl font-bold">$125.000</p>
										</div>
										<div className="text-right">
											<p className="text-sm opacity-80">Límite</p>
											<p className="text-lg font-semibold">$1.000.000</p>
										</div>
									</div>
									<div className="flex justify-between text-sm">
										<span>•••• •••• •••• 4521</span>
										<span>12/27</span>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="bg-white/5 p-4 rounded-lg">
										<div className="flex items-center mb-2">
											<Calendar className="h-4 w-4 text-tenpo-green mr-2" />
											<span className="text-sm text-gray-400">
												Fecha de corte
											</span>
										</div>
										<p className="font-semibold">15 de Diciembre</p>
									</div>
									<div className="bg-white/5 p-4 rounded-lg">
										<div className="flex items-center mb-2">
											<DollarSign className="h-4 w-4 text-tenpo-green mr-2" />
											<span className="text-sm text-gray-400">Pago mínimo</span>
										</div>
										<p className="font-semibold">$12.500</p>
									</div>
								</div>

								<div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-lg">
									<div className="flex items-center">
										<AlertCircle className="h-5 w-5 text-orange-400 mr-2" />
										<div>
											<p className="text-sm font-medium text-orange-400">
												Próximo vencimiento
											</p>
											<p className="text-xs text-gray-300">
												28 de Diciembre, 2024
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Payment Form */}
					<Card className="bg-white/5 border-white/10">
						<CardHeader>
							<CardTitle>Realizar Pago</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{/* Payment Type */}
								<div>
									<Label className="text-base font-medium mb-4 block">
										Tipo de pago
									</Label>
									<div className="space-y-3">
										<div
											className={`p-4 rounded-lg border cursor-pointer transition-colors ${
												paymentType === "minimum"
													? "border-tenpo-green bg-tenpo-green/10"
													: "border-white/20 hover:border-white/40"
											}`}
											onClick={() => setPaymentType("minimum")}
										>
											<div className="flex justify-between items-center">
												<div>
													<p className="font-medium">Pago mínimo</p>
													<p className="text-sm text-gray-400">
														Evita intereses moratorios
													</p>
												</div>
												<p className="text-lg font-bold text-tenpo-green">
													$12.500
												</p>
											</div>
										</div>

										<div
											className={`p-4 rounded-lg border cursor-pointer transition-colors ${
												paymentType === "total"
													? "border-tenpo-green bg-tenpo-green/10"
													: "border-white/20 hover:border-white/40"
											}`}
											onClick={() => setPaymentType("total")}
										>
											<div className="flex justify-between items-center">
												<div>
													<p className="font-medium">Pago total</p>
													<p className="text-sm text-gray-400">
														Liquida completamente tu saldo
													</p>
												</div>
												<p className="text-lg font-bold">$125.000</p>
											</div>
										</div>

										<div
											className={`p-4 rounded-lg border cursor-pointer transition-colors ${
												paymentType === "custom"
													? "border-tenpo-green bg-tenpo-green/10"
													: "border-white/20 hover:border-white/40"
											}`}
											onClick={() => setPaymentType("custom")}
										>
											<div>
												<p className="font-medium">Monto personalizado</p>
												<p className="text-sm text-gray-400">
													Elige el monto que deseas pagar
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Custom Amount */}
								{paymentType === "custom" && (
									<div>
										<Label htmlFor="amount">Monto a pagar</Label>
										<Input
											id="amount"
											type="text"
											placeholder="$0"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
										/>
										<p className="text-xs text-gray-400 mt-1">
											Monto mínimo: $12.500 - Máximo: $125.000
										</p>
									</div>
								)}

								{/* Payment Method */}
								<div>
									<Label className="text-base font-medium mb-3 block">
										Método de pago
									</Label>
									<div className="bg-white/10 p-4 rounded-lg border border-white/20">
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<div className="w-10 h-6 bg-tenpo-green rounded mr-3"></div>
												<div>
													<p className="font-medium">Cuenta Tenpo</p>
													<p className="text-sm text-gray-400">
														Saldo disponible: $2.847.350
													</p>
												</div>
											</div>
											<Button
												variant="outline"
												size="sm"
												className="border-white/20 text-gray-300"
											>
												Cambiar
											</Button>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="space-y-3">
									<Button className="w-full bg-tenpo-green hover:bg-tenpo-green/90 text-tenpo-dark font-semibold">
										Pagar Ahora
									</Button>
									<Button
										variant="outline"
										className="w-full border-white/20 text-gray-300 hover:bg-white/10"
									>
										Programar Pago
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Page>
	);
}
