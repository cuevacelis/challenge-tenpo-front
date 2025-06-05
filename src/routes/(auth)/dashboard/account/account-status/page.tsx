import { Page } from "@/components/page/page";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	FileText,
	Download,
	Calendar,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
	ArrowDownLeft,
	Filter,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute(
	"/(auth)/dashboard/account/account-status/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedPeriod, setSelectedPeriod] = useState("current");

	const periods = [
		{ id: "current", label: "Período actual", date: "Nov 15 - Dic 15, 2024" },
		{
			id: "previous",
			label: "Período anterior",
			date: "Oct 15 - Nov 15, 2024",
		},
		{ id: "two-months", label: "Hace 2 meses", date: "Sep 15 - Oct 15, 2024" },
	];

	const transactions = [
		{
			id: 1,
			date: "2024-12-10",
			description: "Transferencia recibida - María González",
			amount: 150000,
			type: "credit",
			category: "Transferencia",
			balance: 2847350,
		},
		{
			id: 2,
			date: "2024-12-09",
			description: "Pago Starbucks - Mall Plaza Norte",
			amount: -8500,
			type: "debit",
			category: "Alimentación",
			balance: 2697350,
		},
		{
			id: 3,
			date: "2024-12-08",
			description: "Pago tarjeta de crédito",
			amount: -125000,
			type: "debit",
			category: "Pago tarjeta",
			balance: 2705850,
		},
		{
			id: 4,
			date: "2024-12-07",
			description: "Uber - Viaje Las Condes",
			amount: -12500,
			type: "debit",
			category: "Transporte",
			balance: 2830850,
		},
		{
			id: 5,
			date: "2024-12-06",
			description: "Falabella - Compra online",
			amount: -89000,
			type: "debit",
			category: "Compras",
			balance: 2843350,
		},
		{
			id: 6,
			date: "2024-12-05",
			description: "Depósito nómina - Empresa XYZ",
			amount: 1200000,
			type: "credit",
			category: "Salario",
			balance: 2932350,
		},
		{
			id: 7,
			date: "2024-12-04",
			description: "McDonald's - Beneficio 2x1",
			amount: -6500,
			type: "debit",
			category: "Alimentación",
			balance: 1732350,
		},
		{
			id: 8,
			date: "2024-12-03",
			description: "Recarga desde cuenta bancaria",
			amount: 500000,
			type: "credit",
			category: "Recarga",
			balance: 1738850,
		},
	];

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("es-CL", {
			style: "currency",
			currency: "CLP",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("es-CL", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	};

	return (
		<Page title="Estado de cuenta" className="p-4 lg:p-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8 pt-12 lg:pt-0">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-3xl font-bold mb-2">Estado de Cuenta</h1>
							<p className="text-gray-400">
								Revisa el detalle de tus movimientos financieros
							</p>
						</div>
						<div className="flex space-x-2 mt-4 sm:mt-0">
							<Button
								variant="outline"
								className="border-white/20 text-gray-300 hover:bg-white/10"
							>
								<Filter className="h-4 w-4 mr-2" />
								Filtrar
							</Button>
							<Button className="bg-tenpo-green hover:bg-tenpo-green/90 text-tenpo-dark">
								<Download className="h-4 w-4 mr-2" />
								Descargar PDF
							</Button>
						</div>
					</div>
				</div>

				{/* Period Selector */}
				<Card className="mb-6 bg-white/5 border-white/10">
					<CardContent className="p-6">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center mb-4 sm:mb-0">
								<Calendar className="h-5 w-5 text-tenpo-green mr-2" />
								<span className="font-medium">Seleccionar período:</span>
							</div>
							<div className="flex flex-wrap gap-2">
								{periods.map((period) => (
									<Button
										key={period.id}
										variant={
											selectedPeriod === period.id ? "default" : "outline"
										}
										className={
											selectedPeriod === period.id
												? "bg-tenpo-green text-tenpo-dark hover:bg-tenpo-green/90"
												: "border-white/20 text-gray-300 hover:bg-white/10"
										}
										onClick={() => setSelectedPeriod(period.id)}
									>
										<div className="text-center">
											<div className="font-medium">{period.label}</div>
											<div className="text-xs opacity-80">{period.date}</div>
										</div>
									</Button>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<Card className="bg-white/5 border-white/10">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Saldo inicial
							</CardTitle>
							<FileText className="h-4 w-4 text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">$1.732.350</div>
							<p className="text-xs text-gray-400">15 de Noviembre</p>
						</CardContent>
					</Card>

					<Card className="bg-white/5 border-white/10">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Total ingresos
							</CardTitle>
							<TrendingUp className="h-4 w-4 text-tenpo-green" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-tenpo-green">
								$1.850.000
							</div>
							<p className="text-xs text-gray-400">+12% vs período anterior</p>
						</CardContent>
					</Card>

					<Card className="bg-white/5 border-white/10">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Total egresos
							</CardTitle>
							<TrendingDown className="h-4 w-4 text-red-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-red-400">$735.000</div>
							<p className="text-xs text-gray-400">-8% vs período anterior</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-r from-tenpo-green to-emerald-400 border-0 text-tenpo-dark">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium opacity-80">
								Saldo final
							</CardTitle>
							<ArrowUpRight className="h-4 w-4 opacity-80" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">$2.847.350</div>
							<p className="text-xs opacity-80">15 de Diciembre</p>
						</CardContent>
					</Card>
				</div>

				{/* Transactions */}
				<Card className="bg-white/5 border-white/10">
					<CardHeader>
						<CardTitle>Detalle de Movimientos</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{transactions.map((transaction) => (
								<div
									key={transaction.id}
									className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
								>
									<div className="flex items-center space-x-4">
										<div
											className={`w-10 h-10 rounded-full flex items-center justify-center ${
												transaction.type === "credit"
													? "bg-tenpo-green/20"
													: "bg-red-500/20"
											}`}
										>
											{transaction.type === "credit" ? (
												<ArrowDownLeft className="h-5 w-5 text-tenpo-green" />
											) : (
												<ArrowUpRight className="h-5 w-5 text-red-400" />
											)}
										</div>
										<div>
											<p className="font-medium">{transaction.description}</p>
											<div className="flex items-center space-x-2 mt-1">
												<Badge
													variant="secondary"
													className="bg-white/10 text-gray-300 text-xs"
												>
													{transaction.category}
												</Badge>
												<span className="text-xs text-gray-400">
													{formatDate(transaction.date)}
												</span>
											</div>
										</div>
									</div>
									<div className="text-right">
										<p
											className={`text-lg font-semibold ${
												transaction.type === "credit"
													? "text-tenpo-green"
													: "text-red-400"
											}`}
										>
											{transaction.type === "credit" ? "+" : ""}
											{formatCurrency(transaction.amount)}
										</p>
										<p className="text-xs text-gray-400">
											Saldo: {formatCurrency(transaction.balance)}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="text-center mt-6">
							<Button
								variant="outline"
								className="border-white/20 text-gray-300 hover:bg-white/10"
							>
								Cargar más movimientos
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</Page>
	);
}
