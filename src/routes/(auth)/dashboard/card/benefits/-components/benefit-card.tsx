import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { formatLongDateTime } from "@/lib/utils/date-utils";

interface Benefit {
	id: string;
	name: string;
	description: string;
	discount: number;
	type: string;
	color: string;
	iconName: IconName;
	validUntil: string;
	location: string;
}

interface BenefitCardProps {
	benefit: Benefit;
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
	return (
		<Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
			<CardHeader className="pb-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center space-x-3">
						<div
							className="w-12 h-12 rounded-lg flex items-center justify-center"
							style={{ backgroundColor: benefit.color }}
						>
							<DynamicIcon
								name={benefit.iconName || "airplay"}
								className="h-6 w-6 text-white"
							/>
						</div>
						<div>
							<CardTitle className="text-lg">{benefit.name}</CardTitle>
							<Badge
								variant="secondary"
								className="bg-tenpo-green/20 text-tenpo-green border-0"
							>
								{benefit.type}
							</Badge>
						</div>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-tenpo-green">
							{benefit.discount}%
						</div>
						<div className="text-xs text-gray-400">OFF</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-gray-300 mb-4">{benefit.description}</p>

				<div className="space-y-2 mb-4">
					<div className="flex items-center text-sm text-gray-400">
						<Clock className="h-4 w-4 mr-2" />
						<span>
							Válido hasta {formatLongDateTime(benefit.validUntil).fecha}
						</span>
					</div>
					<div className="flex items-center text-sm text-gray-400">
						<MapPin className="h-4 w-4 mr-2" />
						<span>{benefit.location}</span>
					</div>
				</div>

				<Button className="w-full bg-tenpo-green hover:bg-tenpo-green/90 text-tenpo-dark font-semibold">
					Usar Beneficio
				</Button>
			</CardContent>
		</Card>
	);
}
