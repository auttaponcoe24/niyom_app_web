import { TParams } from "@/src/interfaces/zone.interface";
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
