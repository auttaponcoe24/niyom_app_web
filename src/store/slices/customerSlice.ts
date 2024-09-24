import { TActionValues, TParams } from "@/src/interfaces/customer.interface";
import {
	CREATE_CUSTOMER,
	DELETE_CUSTOMER,
	GET_CUSTOMER_ALL,
	GET_CUSTOMER_ID,
	UPDATE_CUSTOMER,
} from "@/src/services/customer.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ICustomerState {
	isLoadingCreate: boolean;
	isLoadingUpdate: boolean;
	isLoadingDelete: boolean;
	isLoadingById: boolean;
	dataById?: any;
	isLoading: boolean;
	data?: any;
}
const initialState: ICustomerState = {
	isLoadingCreate: false,
	isLoadingUpdate: false,
	isLoadingDelete: false,
	isLoadingById: false,
	isLoading: false,
};

// CREATE_CUSTOMER
export const createCustomer = createAsyncThunk(
	"customer/create",
	async (values: TActionValues) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await CREATE_CUSTOMER(values);
		return res;
	}
);

// GET_CUSTOMER_ALL
export const getCustomerAll = createAsyncThunk(
	"customer/getAll",
	async (params: TParams) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await GET_CUSTOMER_ALL(params);
		return res;
	}
);

// GET_CUSTOMER_ID
export const getCustomerId = createAsyncThunk(
	"customer/getById",
	async (id: number) => {
		const res = await GET_CUSTOMER_ID(id);
		return res;
	}
);

// UPDATE_CUSTOMER
export const updateCustomer = createAsyncThunk(
	"customer/update",
	async (values: TActionValues) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await UPDATE_CUSTOMER(values);
		return res;
	}
);

// DELETE_CUSTOMER
export const deleteCustomer = createAsyncThunk(
	"customer/delete",
	async (id: number) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return await DELETE_CUSTOMER(id);
	}
);

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// createCustomer
		builder
			.addCase(createCustomer.pending, (state) => {
				state.isLoadingCreate = true;
			})
			.addCase(createCustomer.fulfilled, (state) => {
				state.isLoadingCreate = false;
			})
			.addCase(createCustomer.rejected, (state) => {
				state.isLoadingCreate = false;
			});

		// getCustomerAll
		builder
			.addCase(getCustomerAll.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCustomerAll.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getCustomerAll.rejected, (state) => {
				state.isLoading = false;
			});

		// getCustomerId
		builder
			.addCase(getCustomerId.pending, (state) => {
				state.isLoadingById = true;
			})
			.addCase(getCustomerId.fulfilled, (state, action) => {
				state.isLoadingById = false;
				state.dataById = action.payload;
			})
			.addCase(getCustomerId.rejected, (state) => {
				state.isLoadingById = false;
			});

		// updateCustomer
		builder
			.addCase(updateCustomer.pending, (state) => {
				state.isLoadingUpdate = true;
			})
			.addCase(updateCustomer.fulfilled, (state) => {
				state.isLoadingUpdate = false;
			})
			.addCase(updateCustomer.rejected, (state) => {
				state.isLoadingUpdate = false;
			});

		// deleteCustomer
		builder
			.addCase(deleteCustomer.pending, (state) => {
				state.isLoadingDelete = true;
			})
			.addCase(deleteCustomer.fulfilled, (state) => {
				state.isLoadingDelete = false;
			})
			.addCase(deleteCustomer.rejected, (state) => {
				state.isLoadingDelete = false;
			});
	},
});

export default customerSlice.reducer;
