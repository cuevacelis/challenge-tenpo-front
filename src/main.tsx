import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/auth/auth-provider.tsx";
import { RouterProviderWithContext } from "./context/router/router-provider.tsx";
import { TanstackQueryProvider } from "./context/tanstack-query/tanstack-query-provider.tsx";
import "./styles/index.css";
import { Toaster } from "./components/ui/sonner.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
	<StrictMode>
		<TanstackQueryProvider>
			<AuthProvider>
				<RouterProviderWithContext />
			</AuthProvider>
		</TanstackQueryProvider>
		<Toaster richColors={true} expand={false} position="top-center" />
	</StrictMode>,
);
