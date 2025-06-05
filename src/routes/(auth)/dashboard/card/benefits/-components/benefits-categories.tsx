import { Button } from "@/components/ui/button";

interface Category {
	id: string;
	displayName: string;
}

interface BenefitsCategoriesProps {
	categories: Category[];
	selectedCategory: string;
	onCategoryChange: (categoryId: string) => void;
}

export default function BenefitsCategories({
	categories,
	selectedCategory,
	onCategoryChange,
}: BenefitsCategoriesProps) {
	return (
		<div className="mb-8">
			<div className="flex flex-wrap gap-2">
				{categories.map((category) => (
					<Button
						key={category.id}
						variant={selectedCategory === category.id ? "default" : "outline"}
						className={
							selectedCategory === category.id
								? "bg-tenpo-green text-tenpo-dark hover:bg-tenpo-green/90"
								: "border-white/20 text-gray-300 hover:bg-white/10"
						}
						onClick={() => onCategoryChange(category.id)}
					>
						{category.displayName}
					</Button>
				))}
			</div>
		</div>
	);
}
