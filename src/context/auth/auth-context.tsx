import type {
	loginFetch,
	LoginResponseUser,
} from "@/routes/(not-auth)/login/-components/login-form/mutation/use-login.mutation";
import { createContext } from "react";

export interface AuthContextType {
	user: LoginResponseUser | null;
	login: (respDataLogin: Awaited<ReturnType<typeof loginFetch>>) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

export const initialStateAuthContext: AuthContextType = {
	user: null,
	login: () => {
		throw new Error("login method not implemented");
	},
	logout: () => {
		throw new Error("logout method not implemented");
	},
	isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>(
	initialStateAuthContext,
);
