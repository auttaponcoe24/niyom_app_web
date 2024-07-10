import { User } from "@/src/interfaces/auth.interface";
import {
	GET_SESSION,
	SIGN_IN,
	SIGN_OUT,
	SIGN_UP,
} from "@/src/services/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// sign-up
export const useGetSignUp = () => {
	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	return useMutation({
		mutationKey: ["use_get_signup"],
		mutationFn: async (value: User) => {
			await delay(2000);
			SIGN_UP(value);
		},
	});
};

// sign-in
export const useGetSignIn = () => {
	return useMutation({
		mutationKey: ["get_signin"],
		mutationFn: async (values: User) => await SIGN_IN(values),
	});
};

// GET_SESSION
export const useGetSession = () => {
	return useQuery({
		queryKey: ["get_session"],
		queryFn: async () => GET_SESSION(),
	});
};
