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
import { ErrorMessage } from "../validate/message/error-message";

interface ErrorModalProps {
	onOpen: boolean;
	onClose: () => void;
	msgAditionalError?: string[] | string;
}

export function ModalError({
	onOpen,
	onClose,
	msgAditionalError,
}: ErrorModalProps) {
	return (
		<>
			{onOpen && (
				<Dialog open={onOpen} onOpenChange={onClose}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader className="sr-only">
							<DialogTitle>Modal Error</DialogTitle>
							<DialogDescription>Información de error</DialogDescription>
						</DialogHeader>
						<div className="text-center">
							<AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
							<h5 className="text-xl font-bold text-gray-900 mb-2">
								¡Atención!
							</h5>
							<ErrorMessage message={msgAditionalError} modeView="card" />
						</div>
						<DialogFooter className="sm:justify-center">
							<Button
								onClick={onClose}
								className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
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
