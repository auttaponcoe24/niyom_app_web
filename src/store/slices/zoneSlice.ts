import { TParams, TZoneData } from "@/src/interfaces/zone.interface";
import {
	CREATE_ZONE,
	DELETE_ZONE,
	GET_BY_ID,
	GET_ZONE,
	UPDATE_ZONE,
} from "@/src/services/zone.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IZoneState {
	isLoading: boolean;
	data?: any;
	dataById?: any;
	isLoadingById: boolean;
	isFetchingUpdateZone: boolean;
	isFetchingDeleteZone: boolean;
}

const initialState: IZoneState = {
	isLoading: false,
	isLoadingById: false,
	isFetchingUpdateZone: false,
	isFetchingDeleteZone: false,
	data: [],
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

// GET_BY_ID
export const getById = createAsyncThunk(
	"zone/getById",
	async (values: TZoneData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await GET_BY_ID(values);
		return res;
	}
);

// updateZone
export const updateZone = createAsyncThunk(
	"zone/update",
	async (values: TZoneData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await UPDATE_ZONE(values);
		return res;
	}
);

// DELETE_ZONE
export const deleteZone = createAsyncThunk(
	"zone/delete",
	async (id: number) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await DELETE_ZONE(id);
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

		// getById
		builder
			.addCase(getById.pending, (state) => {
				state.isLoadingById = true;
			})
			.addCase(getById.fulfilled, (state, action) => {
				state.isLoadingById = false;
				state.dataById = action.payload;
			})
			.addCase(getById.rejected, (state) => {
				state.isLoadingById = false;
			});

		// update
		builder
			.addCase(updateZone.pending, (state) => {
				state.isFetchingUpdateZone = true;
			})
			.addCase(updateZone.fulfilled, (state) => {
				state.isFetchingUpdateZone = false;
			})
			.addCase(updateZone.rejected, (state) => {
				state.isFetchingUpdateZone = false;
			});

		// delete
		builder
			.addCase(deleteZone.pending, (state) => {
				state.isFetchingDeleteZone = true;
			})
			.addCase(deleteZone.fulfilled, (state) => {
				state.isFetchingDeleteZone = false;
			});
	},
});

// export reducer
export default zoneSlice.reducer;
