"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import {
	type IMixedMessageItem,
	MixedMessage,
} from "../validate/message/mixed-message";

interface MixedResultsModalProps {
	onOpen: boolean;
	onClose: () => void;
	mixedMessages: IMixedMessageItem[];
	title?: string;
}

export function ModalMixedResults({
	onOpen,
	onClose,
	mixedMessages,
	title = "¡Atención!",
}: MixedResultsModalProps) {
	// Verificar si hay al menos un error
	const hasErrors = mixedMessages.some((item) => item.isError);

	return (
		<>
			{onOpen && (
				<Dialog open={onOpen} onOpenChange={onClose}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader className="sr-only">
							<DialogTitle>Modal de Resultados</DialogTitle>
							<DialogDescription>Información de operaciones</DialogDescription>
						</DialogHeader>
						<div className="text-center">
							<AlertCircle
								className={`w-16 h-16 mx-auto ${hasErrors ? "text-red-500" : "text-green-500"} mb-4`}
							/>
							<h5 className="text-xl font-bold text-gray-900 mb-2">{title}</h5>
							<MixedMessage messages={mixedMessages} modeView="card" />
						</div>
						<DialogFooter className="sm:justify-center">
							<Button
								onClick={onClose}
								className={`${hasErrors ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300`}
							>
								Cerrar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
