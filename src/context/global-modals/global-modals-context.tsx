import { createContext } from "react";

export interface GlobalModalsContextType {
	sessionExpired: {
		isOpen: boolean;
	};
	unauthorized: {
		isOpen: boolean;
	};
	offline: {
		isOpen: boolean;
	};
	setSessionExpired: React.Dispatch<
		React.SetStateAction<{
			isOpen: boolean;
		}>
	>;
	setUnauthorized: React.Dispatch<
		React.SetStateAction<{
			isOpen: boolean;
		}>
	>;
	setOffline: React.Dispatch<
		React.SetStateAction<{
			isOpen: boolean;
		}>
	>;
}

export const initialStateGlobalModals: GlobalModalsContextType = {
	sessionExpired: {
		isOpen: false,
	},
	unauthorized: {
		isOpen: false,
	},
	offline: {
		isOpen: false,
	},
	setSessionExpired: () => {
		throw new Error("setSessionExpired method not implemented");
	},
	setUnauthorized: () => {
		throw new Error("setUnauthorized method not implemented");
	},
	setOffline: () => {
		throw new Error("setOffline method not implemented");
	},
};

export const GlobalModalsContext = createContext<
	typeof initialStateGlobalModals
>(initialStateGlobalModals);
