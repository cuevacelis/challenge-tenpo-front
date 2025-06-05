"use client";

import { AnimatedCheckSuccess } from "@/components/motion/checken-success";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { SuccessMessage } from "../validate/message/success-message";

interface SuccessModalProps {
	onOpen: boolean;
	onClose: () => void;
	msgAditionalSuccess?: string[] | string;
}

export function ModalSuccess({
	onOpen,
	onClose,
	msgAditionalSuccess,
}: SuccessModalProps) {
	return (
		<>
			{onOpen && (
				<Dialog open={onOpen} onOpenChange={onClose}>
					<DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-linear-to-br from-green-50 to-green-100">
						<DialogHeader className="sr-only">
							<DialogTitle>Modal Success</DialogTitle>
							<DialogDescription>Información de éxito</DialogDescription>
						</DialogHeader>
						<div className="p-6">
							<div className="text-center mb-4">
								<AnimatedCheckSuccess
									size={64}
									className="size-14 mx-auto text-green-500 mb-4"
								/>
								<h6 className="text-xl font-bold text-green-700 mb-2">
									¡SE PROCESÓ CORRECTAMENTE!
								</h6>
								<SuccessMessage message={msgAditionalSuccess} modeView="card" />
							</div>
							<DialogFooter className="sm:justify-center">
								<Button
									variant="outline"
									onClick={onClose}
									className="px-6 py-2 bg-white text-green-600 border-green-300 hover:bg-green-50 transition-colors duration-200"
								>
									Aceptar
								</Button>
							</DialogFooter>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
