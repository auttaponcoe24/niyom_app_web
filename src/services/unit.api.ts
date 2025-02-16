import {
	UnitParams,
	UpdateOrCreateUnitList,
} from "@/src/interfaces/unit.interface";
import httpClient from "@/src/utils/httpClient";

// /unit/getAll?start=1&page_size=10&keywords=&month=8&year=2024&zoneId=1&type=W
export const GET_UNIT = async (params: UnitParams) => {
	try {
		const res = await httpClient.get(
			`/api/unit/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}&customerId=${params.customerId}&date=${params.date}&zoneId=${params.zoneId}&type=${params.type}`
		);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};

// /unit/updateOrCreate
export const UPDATE_OR_CREATE_UNIT = async (values: UpdateOrCreateUnitList) => {
	try {
		const res = await httpClient.put(`/unit/updateOrCreate`, values);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};
