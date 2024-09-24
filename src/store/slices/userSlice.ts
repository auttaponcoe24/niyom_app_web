import { TSignIn, TSignUp } from "@/src/interfaces/auth.interface";
import { UserData } from "@/src/interfaces/user.interface";
import {
	GET_SESSION,
	SIGN_IN,
	SIGN_OUT,
	SIGN_UP,
} from "@/src/services/auth.api";
import httpClient from "@/src/utils/httpClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

type UserState = {
	accessToken: string;
	isLoading: boolean;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	username?: string;
	data?: UserData;
};

export const signUp = createAsyncThunk(
	"user/signUp",
	async (values: TSignUp) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await SIGN_UP(values);
		return res;
	}
);

export const signIn = createAsyncThunk(
	"user/signIn",
	async (values: TSignIn): Promise<any> => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await SIGN_IN(values);

		return res;
	}
);

export const getSession = createAsyncThunk(
	"user/getSession",
	async (): Promise<any> => {
		const res = await GET_SESSION();

		// set access token
		if (typeof window !== "undefined" && !!res.token) {
			// แทรก request interceptor เมื่ออยู่ใน client-side เท่านั้น
			httpClient.interceptors.request.use(
				(config?: AxiosRequestConfig | any) => {
					if (config && config.headers) {
						// คุณสามารถเพิ่มการตั้งค่าหรือ header ที่ต้องการก่อนที่จะส่ง request ได้
						config.headers.Authorization = `Bearer ${res?.token}`;
					}

					return config;
				},
				(error) => {
					return Promise.reject(error);
				}
			);
		}
		return res;
	}
);

export const signOut = createAsyncThunk("user/signOut", async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return SIGN_OUT();
});

const initialState: UserState = {
	accessToken: "",
	isLoading: false,
	isAuthenticated: false,
	isAuthenticating: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// register
		builder
			.addCase(signUp.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(signUp.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(signUp.rejected, (state) => {
				state.isLoading = false;
			});

		// login
		builder
			.addCase(signIn.pending, (state, action) => {
				state.isLoading = true;
				state.isAuthenticated = false;
				state.isAuthenticating = true;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isAuthenticating = false;
				if (action.payload && action.payload.token && action.payload.result) {
					state.accessToken = action.payload?.token;
					state.data = action.payload?.result;
				}
			})
			.addCase(signIn.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.isAuthenticating = false;
			});

		// getSession
		builder
			.addCase(getSession.pending, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = true;
			})
			.addCase(getSession.fulfilled, (state, action) => {
				state.isAuthenticating = false;
				if (action.payload && action.payload.result && action.payload.token) {
					state.accessToken = action.payload.token;
					state.data = action.payload.result;
					state.isAuthenticated = true;
					state.isAuthenticating = false;
					state.username = action.payload?.result?.firstname;
				}
			})
			.addCase(getSession.rejected, (state) => {
				state.isAuthenticated = false;
				state.isAuthenticating = false;
			});

		// signOut
		builder.addCase(signOut.fulfilled, (state) => {
			state.isAuthenticated = false;
			state.accessToken = "";
		});
	},
});

export default userSlice.reducer;
