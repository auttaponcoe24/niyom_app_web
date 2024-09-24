import { GET_PREFIX } from "@/src/services/prefix.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TInitialState {
	isLoading: boolean;
	data?: any;
}

const initialState: TInitialState = {
	isLoading: false,
	data: "",
};

// GET_PREFIX
export const useGetPrefix = createAsyncThunk("prefilx/getAll", async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res = await GET_PREFIX();
	return res;
});

const prefixSlice = createSlice({
	initialState,
	name: "prefix",
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(useGetPrefix.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(useGetPrefix.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload) {
					state.data = action.payload;
				}
			})
			.addCase(useGetPrefix.rejected, (state, action) => {
				state.isLoading = false;
			});
	},
});

export default prefixSlice.reducer;
