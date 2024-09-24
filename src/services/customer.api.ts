import { TActionValues, TParams } from "@/src/interfaces/customer.interface";
import httpClient from "@/src/utils/httpClient";

// /getAll
export const GET_CUSTOMER_ALL = async (params: TParams) => {
	try {
		const res = await httpClient.get(
			`/customer/getAll?start=${params.start}&page_size=${params.page_size}&keywords=${params.keywords}`
		);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /customer/create
export const CREATE_CUSTOMER = async (values: TActionValues) => {
	try {
		const res = await httpClient.post(`/customer/create`, values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /customer/getById
export const GET_CUSTOMER_ID = async (id: number) => {
	try {
		const res = await httpClient.get(`/customer/getById?id=${id}`);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /customer/update
export const UPDATE_CUSTOMER = async (values: TActionValues) => {
	try {
		const res = await httpClient.patch("/customer/update", values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /customer/delete
export const DELETE_CUSTOMER = async (id: number) => {
	let data = {
		id: id,
	};
	try {
		const res = await httpClient.delete(`/customer/delete`, {
			data,
		});

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
