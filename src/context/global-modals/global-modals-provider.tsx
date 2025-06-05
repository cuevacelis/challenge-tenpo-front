import { ModalOffline } from "@/components/modals/modal-offline";
import { SessionExpiredModalComponent } from "@/components/modals/modal-session-expired";
import { UnauthorizedModalComponent } from "@/components/modals/modal-unauthorized";
import { useMemo, useState } from "react";
import {
	GlobalModalsContext,
	initialStateGlobalModals,
} from "./global-modals-context";

/**
 * GlobalModalsProvider
 * ---------------------------------------------
 * Provides the global modals context for the application.
 * Manages the state and visibility of session expired, unauthorized, and offline modals,
 * exposing functions to control their open/close state. This allows any component
 * in the application tree to trigger or listen to these global modals.
 *
 * Hooks used:
 * - useState: Manages the open/close state for sessionExpired, unauthorized, and offline modals.
 * - useMemo: Optimizes the context value to prevent unnecessary re-renders.
 *
 * The context exposes:
 * - sessionExpired: State object for the session expired modal.
 * - unauthorized: State object for the unauthorized modal.
 * - offline: State object for the offline modal.
 * - setSessionExpired: Function to update sessionExpired state.
 * - setUnauthorized: Function to update unauthorized state.
 * - setOffline: Function to update offline state.
 *
 * Renders:
 * - SessionExpiredModalComponent: When sessionExpired.isOpen is true.
 * - UnauthorizedModalComponent: When unauthorized.isOpen is true.
 * - ModalOffline: When offline.isOpen is true.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to render within the context.
 */
export function GlobalModalsProvider({
	children,
}: { children: React.ReactNode }) {
	const [sessionExpired, setSessionExpired] = useState(
		initialStateGlobalModals.sessionExpired,
	); // State for session expired modal
	const [unauthorized, setUnauthorized] = useState(
		initialStateGlobalModals.unauthorized,
	); // State for unauthorized modal
	const [offline, setOffline] = useState(initialStateGlobalModals.offline); // State for offline modal

	const value = useMemo(() => {
		return {
			sessionExpired,
			unauthorized,
			offline,
			setSessionExpired,
			setUnauthorized,
			setOffline,
		};
	}, [sessionExpired, unauthorized, offline]); // Memoized context value

	return (
		<GlobalModalsContext value={value}>
			{children}
			{/* Render session expired modal if open */}
			{sessionExpired.isOpen && <SessionExpiredModalComponent />}
			{/* Render unauthorized modal if open */}
			{unauthorized.isOpen && <UnauthorizedModalComponent />}
			{/* Render offline modal if open */}
			{offline.isOpen && <ModalOffline />}
		</GlobalModalsContext>
	);
}
