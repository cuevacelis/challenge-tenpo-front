import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowUpRight,
	ArrowDownLeft,
	CreditCard,
	TrendingUp,
} from "lucide-react";
import { formatCurrencyAmount } from "@/lib/utils/currency-utils";

interface StatsGridProps {
	currentMonthIncome: number;
	incomeChangePercentage: number;
	currentMonthExpense: number;
	expenseChangePercentage: number;
	creditCardSpent: number;
	creditCardAvailableBalance: number;
	investmentAmount: number;
	investmentChangePercentage: number;
}

export default function StatsGrid({
	currentMonthIncome,
	incomeChangePercentage,
	currentMonthExpense,
	expenseChangePercentage,
	creditCardSpent,
	creditCardAvailableBalance,
	investmentAmount,
	investmentChangePercentage,
}: StatsGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<Card className="bg-white/5 border-white/10">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-gray-400">
						Ingresos del mes
					</CardTitle>
					<ArrowUpRight className="h-4 w-4 text-tenpo-green" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-tenpo-green">
						{formatCurrencyAmount({
							amount: currentMonthIncome,
							currency: "PEN",
						})}
					</div>
					<p className="text-xs text-gray-400">
						{incomeChangePercentage > 0 ? "+" : ""}
						{incomeChangePercentage}% vs mes anterior
					</p>
				</CardContent>
			</Card>

			<Card className="bg-white/5 border-white/10">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-gray-400">
						Gastos del mes
					</CardTitle>
					<ArrowDownLeft className="h-4 w-4 text-red-400" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-red-400">
						{formatCurrencyAmount({
							amount: currentMonthExpense,
							currency: "PEN",
						})}
					</div>
					<p className="text-xs text-gray-400">
						{expenseChangePercentage > 0 ? "+" : ""}
						{expenseChangePercentage}% vs mes anterior
					</p>
				</CardContent>
			</Card>

			<Card className="bg-white/5 border-white/10">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-gray-400">
						Tarjeta de crédito
					</CardTitle>
					<CreditCard className="h-4 w-4 text-blue-400" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{formatCurrencyAmount({
							amount: creditCardSpent,
							currency: "PEN",
						})}
					</div>
					<p className="text-xs text-gray-400">
						Disponible:{" "}
						{formatCurrencyAmount({
							amount: creditCardAvailableBalance,
							currency: "PEN",
						})}
					</p>
				</CardContent>
			</Card>

			<Card className="bg-white/5 border-white/10">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-gray-400">
						Inversiones
					</CardTitle>
					<TrendingUp className="h-4 w-4 text-tenpo-green" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-tenpo-green">
						{formatCurrencyAmount({
							amount: investmentAmount,
							currency: "PEN",
						})}
					</div>
					<p className="text-xs text-gray-400">
						{investmentChangePercentage > 0 ? "+" : ""}
						{investmentChangePercentage}% este mes
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
