import { Button } from "@/components/ui/button";
import { Wallet, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { formatCurrencyAmount } from "@/lib/utils/currency-utils";
import { CardPrimary, CardPrimaryContent } from "@/components/ui/card-primary";

interface BalanceCardProps {
	totalBalance: number;
}

export default function BalanceCard({ totalBalance }: BalanceCardProps) {
	const [showBalance, setShowBalance] = useState(true);

	return (
		<CardPrimary>
			<CardPrimaryContent>
				<div className="flex items-center justify-between mb-4">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="w-2 h-2 bg-white rounded-full animate-pulse" />
							<p className="text-sm text-white/80 font-medium">
								Saldo disponible
							</p>
						</div>
						<div className="flex items-center gap-3">
							<h2 className="text-4xl sm:text-5xl font-bold tracking-tight transition-all duration-300">
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
								className="text-white hover:bg-white/20 transition-all duration-200 rounded-full"
								aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
							>
								{showBalance ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</Button>
						</div>
					</div>
					<Wallet className="h-12 w-12 opacity-80 hidden sm:block" />
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
			</CardPrimaryContent>
		</CardPrimary>
	);
}
