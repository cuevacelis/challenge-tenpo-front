import { Card, CardContent } from "@/components/ui/card";
import { Gift, Percent, Star } from "lucide-react";

interface BenefitsStatsProps {
	totalBenefits: number;
	monthlySavings: number;
	usedBenefits: number;
}

export default function BenefitsStats({
	totalBenefits,
	monthlySavings,
	usedBenefits,
}: BenefitsStatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<Card className="bg-gradient-to-r from-tenpo-green to-emerald-400 border-0 text-tenpo-dark">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm opacity-80">Beneficios disponibles</p>
							<p className="text-3xl font-bold">{totalBenefits}</p>
						</div>
						<Gift className="h-10 w-10 opacity-80" />
					</div>
				</CardContent>
			</Card>

			<Card className="bg-white/5 border-white/10">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-400">Ahorros este mes</p>
							<p className="text-3xl font-bold text-tenpo-green">
								${monthlySavings.toLocaleString()}
							</p>
						</div>
						<Percent className="h-10 w-10 text-tenpo-green" />
					</div>
				</CardContent>
			</Card>

			<Card className="bg-white/5 border-white/10">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-400">Beneficios usados</p>
							<p className="text-3xl font-bold">{usedBenefits}</p>
						</div>
						<Star className="h-10 w-10 text-yellow-400" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
