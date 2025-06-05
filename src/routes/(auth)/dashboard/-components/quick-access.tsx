import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, TrendingUp, Gift } from "lucide-react";
import {
	CardSecondary,
	CardSecondaryContent,
} from "@/components/ui/card-secondary";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

export default function QuickAccess() {
	return (
		<CardSecondary className="bg-white/5 border-white/10">
			<CardHeader>
				<CardTitle>Accesos Rápidos</CardTitle>
			</CardHeader>
			<CardSecondaryContent>
				<div className="grid grid-cols-2 gap-4">
					<Button
						asChild
						className="h-20 flex flex-col items-center justify-center bg-green-400/20 hover:bg-green-400/30 text-green-400 border-green-400/30"
					>
						<Link to="/dashboard/card/pay-card">
							<CreditCard className="h-6 w-6 mb-2" />
							<span className="text-sm">Pagar Tarjeta</span>
						</Link>
					</Button>
					<Button
						asChild
						className="h-20 flex flex-col items-center justify-center bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30"
					>
						<Link to="/dashboard/card/benefits">
							<Gift className="h-6 w-6 mb-2" />
							<span className="text-sm">Ver Beneficios</span>
						</Link>
					</Button>
					<Button
						asChild
						className="h-20 flex flex-col items-center justify-center bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30"
					>
						<Link to="/dashboard">
							<Wallet className="h-6 w-6 mb-2" />
							<span className="text-sm">Recargar</span>
						</Link>
					</Button>
					<Button
						asChild
						className="h-20 flex flex-col items-center justify-center bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30"
					>
						<Link to="/dashboard">
							<TrendingUp className="h-6 w-6 mb-2" />
							<span className="text-sm">Invertir</span>
						</Link>
					</Button>
				</div>
			</CardSecondaryContent>
		</CardSecondary>
	);
}
