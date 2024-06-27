import { User } from "@/src/interfaces/auth.interface";
import { SIGN_IN, SIGN_UP } from "@/src/services/auth.api";
import { useMutation } from "@tanstack/react-query";

// sign-up
export const useGetSignUp = () => {
	return useMutation({
		mutationKey: ["use_get_signup"],
		mutationFn: (value: User) => SIGN_UP(value),
	});
};

// sign-in
export const useGetSignIn = () => {
	return useMutation({
		mutationKey: ["use_get_signin"],
		mutationFn: (values: User) => SIGN_IN(values),
	});
};
