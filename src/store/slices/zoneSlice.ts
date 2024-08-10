import { TParams } from "@/src/interfaces/zone.interface";
import { CREATE_ZONE, GET_ZONE } from "@/src/services/zone.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IZoneState {
	isLoading: boolean;
	data?: any;
}

const initialState: IZoneState = {
	isLoading: false,
};

export interface IZoneAction {
	zone_name: string;
}
export const createZone = createAsyncThunk(
	"zone/create",
	async (values: IZoneAction) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await CREATE_ZONE(values);
		return res;
	}
);

export const getZoneAll = createAsyncThunk(
	"zone/getAll",
	async (params: TParams) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await GET_ZONE(params);
		return res;
	}
);

const zoneSlice = createSlice({
	name: "zone",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// create
		builder
			.addCase(createZone.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createZone.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(createZone.rejected, (state) => {
				state.isLoading = false;
			});

		// getAll
		builder
			.addCase(getZoneAll.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getZoneAll.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getZoneAll.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

// export reducer
export default zoneSlice.reducer;
