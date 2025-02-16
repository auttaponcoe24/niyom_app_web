import { SignIn } from "@/src/interfaces/auth.interface";
import { GET_SESSION, SIGN_IN, SIGN_OUT } from "@/src/services/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// SIGN_IN
export const useSignIn = () => {
	return useMutation({
		mutationKey: ["signin"],
		mutationFn: async (values: SignIn) => await SIGN_IN(values),
	});
};

// SIGN_OUT
export const useSignOut = () => {
	return useQuery({
		queryKey: ["signout"],
		queryFn: async () => await SIGN_OUT(),
		enabled: false, // ปิดการ fetch อัตโนมัติ
	});
};

// GET_SESSION
export const useSession = () => {
	return useQuery({
		queryKey: ["session"],
		queryFn: async () => await GET_SESSION(),
	});
};
