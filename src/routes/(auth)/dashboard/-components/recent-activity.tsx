import { CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyAmount } from "@/lib/utils/currency-utils";
import { formatLongDateTime, isCurrentDay } from "@/lib/utils/date-utils";
import {
	CardSecondary,
	CardSecondaryContent,
} from "@/components/ui/card-secondary";

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
		<CardSecondary>
			<CardHeader>
				<CardTitle>Actividad Reciente</CardTitle>
			</CardHeader>
			<CardSecondaryContent>
				<div className="space-y-4">
					{recentActivity.map((transaction) => (
						<section
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
											? "text-green-400"
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
						</section>
					))}
				</div>
			</CardSecondaryContent>
		</CardSecondary>
	);
}
