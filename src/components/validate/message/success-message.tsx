import { cn } from "@/lib/utils/class-utils";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
	isShowIcon?: boolean;
	modeView?: "card" | "inline";
	message: string[] | string | undefined;
	className?: string;
}

export function SuccessMessage({
	isShowIcon = true,
	modeView = "inline",
	message,
	className,
}: IProps) {
	if (!message) {
		return null;
	}

	return (
		<section
			className={cn("overflow-y-auto text-left", className, {
				"rounded-md p-3 border border-green-100 shadow-sm bg-white/80":
					modeView === "card",
			})}
			aria-live="polite"
			aria-atomic="true"
		>
			{typeof message === "string" ? (
				<div className="flex flex-row gap-2 items-start">
					<CheckCircleIcon
						className={cn("size-5 text-green-500 shrink-0", {
							hidden: !isShowIcon,
						})}
					/>
					<p className="w-auto text-sm text-green-500">{message}</p>
				</div>
			) : (
				<ul className="list-none text-sm text-green-500">
					{message.map((msg) => (
						<li key={msg} className="flex flex-row gap-2 items-start">
							<CheckCircleIcon
								className={cn("size-5 text-green-500 shrink-0", {
									hidden: !isShowIcon,
								})}
							/>
							{msg}
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
