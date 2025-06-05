import { handleAxiosError } from "@/lib/api/utils";
import { useMutation } from "@tanstack/react-query";

export interface CredentialsResponse {
	credential?: string;
}

export interface LoginResponseUser {
	codigo?: number;
	mensaje?: string;
	data?: {
		avatar: string;
		cpersona: number;
		nombre: string;
		sexo: string;
		tcorreo: string;
		celular: string;
		ndoc_identidad: string;
	};
}

export interface LoginParams {
	email: string;
	password: string;
}

const getAuthTokenFakeFetch = async (_params: LoginParams) => {
	await new Promise((resolve) => setTimeout(resolve, 5000));

	return {
		access_token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
		expires: Date.now() + 24 * 60 * 60 * 1000, // 1 día en milisegundos
	};
};

const getUserDataFakeFetch = async (
	_token: string,
): Promise<LoginResponseUser> => {
	return {
		codigo: 200,
		mensaje: "Login exitoso",
		data: {
			avatar: "https://randomuser.me/api/portraits/men/1.jpg",
			cpersona: 1,
			nombre: "Juan Pérez",
			sexo: "M",
			tcorreo: "juan.perez@ejemplo.com",
			celular: "+56912345678",
			ndoc_identidad: "12345678-9",
		},
	};
};

export const loginFetch = async (params: LoginParams) => {
	try {
		const dataToken = await getAuthTokenFakeFetch(params);
		const dataUser = await getUserDataFakeFetch(dataToken.access_token);

		return { dataToken, dataUser };
	} catch (error) {
		return Promise.reject(handleAxiosError(error));
	}
};

export function useLoginMutation() {
	return useMutation({
		mutationFn: loginFetch,
	});
}
