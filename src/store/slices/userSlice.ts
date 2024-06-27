import { User } from "@/src/interfaces/auth.interface";
import { SIGN_UP } from "@/src/services/auth.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserState = {
	isLoading: boolean;
	data?: any;
};

export const sign_up = createAsyncThunk(
	"user/sign-up",
	async (values: User) => {
		const res = await SIGN_UP(values);
		return res;
	}
);

const initialState: UserState = {
	isLoading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// register
		builder.addCase(sign_up.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(sign_up.fulfilled, (state, action) => {
			state.isLoading = false;
		});
	},
});

export default userSlice.reducer;
