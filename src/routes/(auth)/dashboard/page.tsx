import { Page } from "@/components/page/page";
import { QueryStatusHandler } from "@/components/request-status/query-status-handler";
import { createFileRoute } from "@tanstack/react-router";
import { useSummary } from "./-services/use-summary.query";
import BalanceCard from "./-components/balance-card";
import StatsGrid from "./-components/stats-grid";
import RecentActivity from "./-components/recent-activity";

export const Route = createFileRoute("/(auth)/dashboard/")({
	component: DashboardPage,
});

function DashboardPage() {
	const summaryQuery = useSummary({});

	return (
		<Page title="Dashboard" className="p-4 lg:p-8">
			<QueryStatusHandler queries={[summaryQuery]}>
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="mb-8 pt-12 lg:pt-0">
						<h1 className="text-3xl font-bold mb-2">¡Hola, Juan! 👋</h1>
						<p className="text-gray-400">
							Aquí tienes un resumen de tu actividad financiera
						</p>
					</div>

					{/* Balance Card */}
					<BalanceCard totalBalance={summaryQuery.data?.totalBalance ?? 0} />

					{/* Stats Grid */}
					<StatsGrid
						currentMonthIncome={summaryQuery.data?.currentMonthIncome ?? 0}
						incomeChangePercentage={
							summaryQuery.data?.incomeChangePercentage ?? 0
						}
						currentMonthExpense={summaryQuery.data?.currentMonthExpense ?? 0}
						expenseChangePercentage={
							summaryQuery.data?.expenseChangePercentage ?? 0
						}
						creditCardSpent={summaryQuery.data?.creditCardSpent ?? 0}
						creditCardAvailableBalance={
							summaryQuery.data?.creditCardAvailableBalance ?? 0
						}
						investmentAmount={summaryQuery.data?.investmentAmount ?? 0}
						investmentChangePercentage={
							summaryQuery.data?.investmentChangePercentage ?? 0
						}
					/>

					{/* Recent Activity */}
					<RecentActivity
						recentActivity={summaryQuery.data?.recentActivity ?? []}
					/>
				</div>
			</QueryStatusHandler>
		</Page>
	);
}
