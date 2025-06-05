import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CreditCard, Wallet, TrendingUp } from "lucide-react";
import { formatCurrencyAmount } from "@/lib/utils/currency-utils";
import { formatLongDateTime, isCurrentDay } from "@/lib/utils/date-utils";

interface Transaction {
	date: string;
	type: string;
	name: string;
	amount: number;
	transactionType: string;
}

interface RecentActivityProps {
	recentActivity: Transaction[];
}

export default function RecentActivity({
	recentActivity,
}: RecentActivityProps) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<Card className="bg-white/5 border-white/10">
				<CardHeader>
					<CardTitle>Actividad Reciente</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentActivity.map((transaction) => (
							<div
								key={`${transaction.date}-${transaction.type}-${transaction.amount}`}
								className="flex items-center justify-between py-2"
							>
								<div>
									<p className="font-medium">{transaction.type}</p>
									<p className="text-sm text-gray-400">{transaction.name}</p>
								</div>
								<div className="text-right">
									<p
										className={`font-medium ${
											transaction.transactionType === "payment"
												? "text-tenpo-green"
												: "text-red-400"
										}`}
									>
										{transaction.transactionType === "payment" ? "+" : "-"}
										{formatCurrencyAmount({
											amount: transaction.amount,
											currency: "PEN",
										})}
									</p>
									<p className="text-xs text-gray-400">
										{isCurrentDay(transaction.date)
											? "Hoy"
											: formatLongDateTime(transaction.date).fecha}
									</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card className="bg-white/5 border-white/10">
				<CardHeader>
					<CardTitle>Accesos Rápidos</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4">
						<Button className="h-20 flex flex-col items-center justify-center bg-tenpo-green/20 hover:bg-tenpo-green/30 text-tenpo-green border-tenpo-green/30">
							<CreditCard className="h-6 w-6 mb-2" />
							<span className="text-sm">Pagar Tarjeta</span>
						</Button>
						<Button className="h-20 flex flex-col items-center justify-center bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
							<ArrowUpRight className="h-6 w-6 mb-2" />
							<span className="text-sm">Transferir</span>
						</Button>
						<Button className="h-20 flex flex-col items-center justify-center bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
							<Wallet className="h-6 w-6 mb-2" />
							<span className="text-sm">Recargar</span>
						</Button>
						<Button className="h-20 flex flex-col items-center justify-center bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30">
							<TrendingUp className="h-6 w-6 mb-2" />
							<span className="text-sm">Invertir</span>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
