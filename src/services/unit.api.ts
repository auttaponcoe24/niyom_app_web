import { TParams } from "@/src/interfaces/unit.interface";
import httpClient from "@/src/utils/httpClient";

// /unit/getAll?start=1&page_size=10&keywords=&month=8&year=2024&zoneId=1&type=W
export const GET_UNIT = async (params: TParams) => {
	try {
		const res = await httpClient.get(
			`/unit/getAll?start=${params.start}&page_size=${params.page_size}&keywords=${params.keywords}&month=${params.month}&year=${params.year}&zoneId=${params.zoneId}&type=${params.type}`
		);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};

// /unit/updateOrCreate
export const UPDATE_OR_CREATE_UNIT = async (values: any) => {
	try {
		const res = await httpClient.put(`/unit/updateOrCreate`, values);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};
