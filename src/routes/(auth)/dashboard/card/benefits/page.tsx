import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Page } from "@/components/page/page";
import { QueryStatusHandler } from "@/components/request-status/query-status-handler";
import { useBenefits } from "./-services/use-benfits.query";
import { useBenefitCategories } from "./-services/use-benefit-categories.query";
import { Fragment, useState } from "react";
import BenefitsStats from "@/routes/(auth)/dashboard/card/benefits/-components/benefits-stats";
import BenefitsCategories from "@/routes/(auth)/dashboard/card/benefits/-components/benefits-categories";
import BenefitsEmptyState from "@/routes/(auth)/dashboard/card/benefits/-components/benefits-empty-state";
import BenefitCard from "@/routes/(auth)/dashboard/card/benefits/-components/benefit-card";

export const Route = createFileRoute("/(auth)/dashboard/card/benefits/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const categoriesQuery = useBenefitCategories({
		config: { enabled: true },
	});

	const benefitsQuery = useBenefits({
		params: { limit: 6, type: selectedCategory },
		config: {
			enabled: categoriesQuery.isSuccess && selectedCategory !== "",
		},
	});

	// Función para manejar cambio de categoría
	const handleCategoryChange = (categoryId: string) => {
		setSelectedCategory(categoryId);
	};

	return (
		<Page title="Beneficios" className="p-4 lg:p-8">
			<QueryStatusHandler queries={[categoriesQuery]}>
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="mb-8 pt-12 lg:pt-0">
						<h1 className="text-3xl font-bold mb-2">Beneficios Tenpo</h1>
						<p className="text-gray-400">
							Descubre descuentos exclusivos y ofertas especiales
						</p>
					</div>

					{/* Stats */}
					<BenefitsStats
						totalBenefits={benefitsQuery.data?.pages?.[0]?.totalBenefits ?? 0}
						monthlySavings={benefitsQuery.data?.pages?.[0]?.monthlySavings ?? 0}
						usedBenefits={benefitsQuery.data?.pages?.[0]?.usedBenefits ?? 0}
					/>

					{/* Categories */}
					<BenefitsCategories
						categories={categoriesQuery.data?.categories ?? []}
						selectedCategory={selectedCategory}
						onCategoryChange={handleCategoryChange}
					/>
					<QueryStatusHandler queries={[benefitsQuery]} hideLoadingModal>
						{/* Benefits Grid */}
						{benefitsQuery.data?.pages?.some(
							(page) => page.benefits?.length > 0,
						) && (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{benefitsQuery.data.pages.map((page, index) => (
									<Fragment key={index}>
										{page.benefits?.map((benefit) => (
											<BenefitCard key={benefit.id} benefit={benefit} />
										))}
									</Fragment>
								))}
							</div>
						)}

						{/* Load More Button */}
						{benefitsQuery.hasNextPage && (
							<div className="mt-8 flex justify-center">
								<Button
									variant="outline"
									className="border-white/20 text-gray-300 hover:bg-white/10"
									onClick={() => void benefitsQuery.fetchNextPage()}
									disabled={benefitsQuery.isFetchingNextPage}
								>
									{benefitsQuery.isFetchingNextPage ? (
										<>
											<Loader2 className="h-4 w-4 animate-spin mr-2" />
											Cargando...
										</>
									) : (
										"Ver más beneficios"
									)}
								</Button>
							</div>
						)}

						{/* Empty State */}
						{!benefitsQuery.data?.pages?.[0]?.benefits?.length && (
							<BenefitsEmptyState
								selectedCategory={selectedCategory}
								categories={categoriesQuery.data?.categories}
							/>
						)}
					</QueryStatusHandler>
				</div>
			</QueryStatusHandler>
		</Page>
	);
}
