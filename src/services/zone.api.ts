import { TParams, TZoneData } from "@/src/interfaces/zone.interface";
import httpClient from "@/src/utils/httpClient";

// /zone/create
export const CREATE_ZONE = async (values: any) => {
	try {
		const res = await httpClient.post(`/zone/create`, values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /getAll
export const GET_ZONE = async (params: TParams) => {
	try {
		const res = await httpClient.get(
			`/zone/getAll?start=${params.start}&page_size=${params.page_size}&keywords=${params.keywords}`
		);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /zone/getById?id=4
export const GET_BY_ID = async (values: TZoneData) => {
	try {
		const res = await httpClient.get(`/zone/getById?id=${values.id}`);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /zone/update
export const UPDATE_ZONE = async (values: TZoneData) => {
	try {
		const res = await httpClient.patch(`/zone/update`, values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /zone/delete
export const DELETE_ZONE = async (id: number) => {
	try {
		let data = {
			id: Number(id),
		};
		const res = await httpClient.delete(`/zone/delete`, {
			data: data,
		});

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
