import { User } from "@/src/interfaces/auth.interface";
import httpClient from "@/src/utils/httpClient";

export const SIGN_UP = async (values: User) => {
	try {
		const res = await httpClient.post(`/auth/sign-in`, values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
