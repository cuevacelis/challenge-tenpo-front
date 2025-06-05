import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { formatLongDateTime } from "@/lib/utils/date-utils";
import type { IFetchResponseBenefits } from "../-services/use-benfits.query";
import { CardSecondary } from "@/components/ui/card-secondary";

interface BenefitCardProps {
	benefit: IFetchResponseBenefits["benefits"][number];
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
	return (
		<CardSecondary className="transition-colors">
			<CardHeader className="pb-4">
				<div className="flex items-start justify-between gap-4">
					<section className="flex items-start space-x-3">
						<div
							className="w-12 h-12 rounded-lg flex items-center justify-center"
							style={{ backgroundColor: benefit.color }}
						>
							<DynamicIcon
								name={benefit.iconName || "airplay"}
								className="size-6 text-white"
							/>
						</div>

						<div>
							<CardTitle className="text-lg">{benefit.name}</CardTitle>
							<Badge variant="secondary">{benefit.type}</Badge>
						</div>
					</section>

					<section className="flex flex-col items-end">
						<p className="text-2xl font-bold text-tenpo-green">
							{benefit.discount}%
						</p>
						<p className="text-xs text-gray-400">OFF</p>
					</section>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-gray-300 mb-4">{benefit.description}</p>

				<section className="space-y-2 mb-4">
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
				</section>
			</CardContent>
		</CardSecondary>
	);
}
