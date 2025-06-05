import { useEffect } from "react";
import { use } from "react";
import { GlobalModalsContext } from "./global-modals-context";

interface UseGlobalModalProps {
	sessionExpired: {
		isOpen: boolean;
	};
	unauthorized: {
		isOpen: boolean;
	};
	offline: {
		isOpen: boolean;
	};
}

export function useGlobalModal(props: UseGlobalModalProps) {
	const context = use(GlobalModalsContext);

	if (!context) {
		throw new Error(
			"useGlobalModal debe ser usado dentro de GlobalModalsProvider",
		);
	}

	const { setSessionExpired, setUnauthorized, setOffline } = context;

	useEffect(() => {
		setSessionExpired({ isOpen: props.sessionExpired.isOpen });
	}, [props.sessionExpired.isOpen, setSessionExpired]);

	useEffect(() => {
		setUnauthorized({ isOpen: props.unauthorized.isOpen });
	}, [props.unauthorized.isOpen, setUnauthorized]);

	useEffect(() => {
		setOffline({ isOpen: props.offline.isOpen });
	}, [props.offline.isOpen, setOffline]);

	return context;
}
