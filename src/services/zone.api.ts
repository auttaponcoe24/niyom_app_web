import {
	CreateZone,
	TParams,
	TZoneData,
	UpdateZone,
	ZoneFetchResponse,
} from "@/src/interfaces/zone.interface";
import httpClient from "@/src/utils/httpClient";

// /zone/create
export const CREATE_ZONE = async (values: CreateZone) => {
	try {
		const res = await httpClient.post(`/api/zone/create`, values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /getAll
export const GET_ZONE = async (params: TParams): Promise<ZoneFetchResponse> => {
	const res = await httpClient.get(
		`/api/zone/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}`
	);

	return res.data;
};

// /zone/getById?id=4
export const GET_BY_ID = async (id: number) => {
	try {
		const res = await httpClient.get(`/api/zone/getById?id=${id}`);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /zone/update
export const UPDATE_ZONE = async (values: UpdateZone) => {
	try {
		const res = await httpClient.patch(`/api/zone/update`, values);

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
		const res = await httpClient.delete(`/api/zone/delete`, {
			data: data,
		});

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
