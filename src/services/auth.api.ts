import { User } from "@/src/interfaces/auth.interface";
import httpClient from "@/src/utils/httpClient";
import { AxiosRequestConfig } from "axios";

export const SIGN_UP = async (values: User) => {
	try {
		const res = await httpClient.post(`/auth/sign-up`, values);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const SIGN_IN = async (values: User) => {
	const res = await httpClient.post(`/api/auth/signin`, values, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});

	if (typeof window !== "undefined") {
		// แทรก request interceptor เมื่ออยู่ใน client-side เท่านั้น
		httpClient.interceptors.request.use(
			(config?: AxiosRequestConfig | any) => {
				if (config && config.headers) {
					// คุณสามารถเพิ่มการตั้งค่าหรือ header ที่ต้องการก่อนที่จะส่ง request ได้
					config.headers.Authorization = `Bearer ${res?.data?.accessToken}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	}

	return res.data;
};

export const SIGN_OUT = async () => {
	const res = await httpClient.get(`/api/auth/signout`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});

	return res.data;
};

export const GET_SESSION = async () => {
	const res = await httpClient.get(`/api/auth/session`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});

	if (typeof window !== "undefined") {
		// แทรก request interceptor เมื่ออยู่ใน client-side เท่านั้น
		httpClient.interceptors.request.use(
			(config?: AxiosRequestConfig | any) => {
				if (config && config.headers) {
					// คุณสามารถเพิ่มการตั้งค่าหรือ header ที่ต้องการก่อนที่จะส่ง request ได้
					config.headers.Authorization = `Bearer ${res?.data?.user?.accessToken}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	}

	return res.data;
};
