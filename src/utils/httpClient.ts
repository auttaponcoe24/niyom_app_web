import axios from "axios";

const httpClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});

httpClient.interceptors.request.use(
	(config) => {
		if (typeof window !== "undefined") {
			const token: string = localStorage.getItem("accessToken") ?? "";
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor ตรวจสอบ Token หมดอายุ
// httpClient.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;

// 		// ถ้า 401 (Unauthorized) -> ลองรีเฟรช Token
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				if (typeof window !== "undefined") {
// 					const res = await httpClient.post(
// 						"/api/auth/refresh-token",
// 						{},
// 						{
// 							baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
// 						}
// 					);

// 					// อัพเดท Token ใหม่
// 					localStorage.setItem("accessToken", res.data.accessToken);

// 					// รีเซ็ต Header และส่ง Request ใหม่
// 					originalRequest.headers[
// 						"Authorization"
// 					] = `Bearer ${res.data.accessToken}`;
// 					return httpClient(originalRequest);
// 				}
// 			} catch (refreshError) {
// 				console.error("Token refresh failed", refreshError);
// 				localStorage.removeItem("accessToken");
// 				window.location.href = "/login";
// 			}
// 		}

// 		return Promise.reject(error);
// 	}
// );

export default httpClient;
