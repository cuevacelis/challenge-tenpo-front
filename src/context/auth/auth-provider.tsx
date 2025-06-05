import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useCookie, useLocalStorage } from "react-use";
import { AuthContext, initialStateAuthContext } from "./auth-context";
import type { loginFetch } from "@/routes/(not-auth)/login/-components/login-form/mutation/use-login.mutation";

/**
 * AuthProvider
 * ---------------------------------------------
 * Provides the authentication context for the application.
 * Manages the user's authentication state, application routes storage,
 * and exposes functions to log in and log out. Uses cookies and localStorage for persistence.
 *
 * Hooks used:
 * - useQueryClient: Allows interaction with the tanstack-query cache.
 * - useCookie: Manages the authentication token in cookies.
 * - useLocalStorage: Stores user information and application routes in localStorage.
 *
 * The context exposes:
 * - user: Authenticated user information.
 * - applicationRoutes: Available routes according to the user.
 * - login: Function to log in and save relevant data.
 * - logout: Function to log out and clear data.
 * - isAuthenticated: Boolean indicating if the user is authenticated.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to render within the context.
 */
export function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = useQueryClient();
	const [token, setToken, removeToken] = useCookie("token");
	const [user, setUser, removeUser] = useLocalStorage(
		"user",
		initialStateAuthContext.user,
	);

	const isAuthenticated = !!user && !!token;

	/**
	 * Logs in by saving the token, user, and routes in local storage and cookies.
	 * @param {Awaited<ReturnType<typeof loginFetch>>} respDataLogin - Login response data.
	 */
	const login = useCallback(
		(respDataLogin: Awaited<ReturnType<typeof loginFetch>>) => {
			const { dataToken, dataUser } = respDataLogin;
			setToken(dataToken.access_token, {
				expires: dataToken.expires,
				path: "/",
				sameSite: "strict",
				secure: true,
				priority: "High",
			});
			setUser(dataUser);
		},
		[setToken, setUser],
	);

	/**
	 * Logs out by removing token, user, and routes, and clears the query cache.
	 */
	const logout = useCallback(() => {
		removeToken();
		removeUser();
		queryClient.clear();
	}, [queryClient, removeToken, removeUser]);

	/**
	 * Authentication context value exposed to child components.
	 */
	const value = useMemo(
		() => ({
			user: user ?? initialStateAuthContext.user,
			login,
			logout,
			isAuthenticated,
		}),
		[user, login, logout, isAuthenticated],
	);

	return <AuthContext value={value}>{children}</AuthContext>;
}
