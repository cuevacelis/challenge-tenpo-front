import { use } from "react";
import { AuthContext } from "./auth-context";

export function useAuth() {
	const context = use(AuthContext);

	if (context === undefined)
		throw new Error("useAuth must be used within a AuthProvider");

	return context;
}
