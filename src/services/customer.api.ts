import {
	CreateCustomer,
	CustomerData,
	CustomerFetchResponse,
	CustomerParams,
	UpdateCustomer,
} from "@/src/interfaces/customer.interface";
import httpClient from "@/src/utils/httpClient";

// /getAll
export const GET_CUSTOMER_ALL = async (
	params: CustomerParams
): Promise<CustomerFetchResponse> => {
	const zoneId = params.zoneId !== 0 ? params.zoneId : "";
	const res = await httpClient.get(
		`/api/customer/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}&zoneId=${zoneId}`
	);

	return res.data;
};

// /customer/create
export const CREATE_CUSTOMER = async (values: CreateCustomer) => {
	try {
		const res = await httpClient.post(`/api/customer/create`, values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /customer/getById
export const GET_CUSTOMER_ID = async (
	id: string
): Promise<{ message: string; data: CustomerData } | undefined> => {
	try {
		const res = await httpClient.get(`/api/customer/getById?id=${id}`);

		return res.data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

// /customer/update
export const UPDATE_CUSTOMER = async (values: UpdateCustomer) => {
	try {
		const res = await httpClient.patch("/api/customer/update", values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /customer/delete
export const DELETE_CUSTOMER = async (id: string) => {
	let data = {
		id: id,
	};
	try {
		const res = await httpClient.delete(`/api/customer/delete`, {
			data,
		});

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
