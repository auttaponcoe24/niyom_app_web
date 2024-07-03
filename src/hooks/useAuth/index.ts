import { User } from "@/src/interfaces/auth.interface";
import { SIGN_IN, SIGN_UP } from "@/src/services/auth.api";
import { useMutation } from "@tanstack/react-query";

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
	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	return useMutation({
		mutationKey: ["use_get_signin"],
		mutationFn: async (values: User) => {
			await delay(2000);
			return SIGN_IN(values);
		},
	});
};
