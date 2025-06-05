import { Gift } from "lucide-react";

interface BenefitsEmptyStateProps {
	selectedCategory: string;
	categories?: { id: string; name: string }[];
}

export default function BenefitsEmptyState({
	selectedCategory,
	categories,
}: BenefitsEmptyStateProps) {
	const isAllCategory =
		categories
			?.find((cat) => cat.id === selectedCategory)
			?.name?.toLowerCase()
			.includes("todos") ??
		categories?.find((cat) => cat.id === selectedCategory)?.id === "all";

	return (
		<div className="text-center py-12">
			<Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
			<h3 className="text-lg font-semibold text-gray-300 mb-2">
				No hay beneficios disponibles
			</h3>
			<p className="text-gray-400">
				{isAllCategory
					? "Próximamente tendremos nuevos beneficios para ti"
					: "No hay beneficios disponibles en la categoría seleccionada"}
			</p>
		</div>
	);
}
