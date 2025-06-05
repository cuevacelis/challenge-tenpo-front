import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { formatCurrencyAmount } from "@/lib/utils/currency-utils";

interface BalanceCardProps {
	totalBalance: number;
}

export default function BalanceCard({ totalBalance }: BalanceCardProps) {
	const [showBalance, setShowBalance] = useState(true);

	return (
		<Card className="mb-8 bg-gradient-to-r from-tenpo-green to-emerald-400 border-0 text-tenpo-dark">
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-4">
					<div>
						<p className="text-sm opacity-80">Saldo disponible</p>
						<div className="flex items-center space-x-2">
							<h2 className="text-4xl font-bold">
								{showBalance
									? formatCurrencyAmount({
											amount: totalBalance,
											currency: "PEN",
										})
									: "••••••••"}
							</h2>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setShowBalance(!showBalance)}
								className="text-tenpo-dark hover:bg-white/20"
							>
								{showBalance ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</Button>
						</div>
					</div>
					<Wallet className="h-12 w-12 opacity-80" />
				</div>
				<div className="flex space-x-4">
					<Button className="bg-tenpo-dark text-tenpo-green hover:bg-gray-800">
						Transferir
					</Button>
					<Button
						variant="outline"
						className="border-tenpo-dark text-tenpo-dark hover:bg-tenpo-dark hover:text-tenpo-green"
					>
						Recargar
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
