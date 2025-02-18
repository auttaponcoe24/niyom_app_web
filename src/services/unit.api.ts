import {
	UnitListFetchResponse,
	UnitParams,
	UpdateOrCreateUnitList,
} from "@/src/interfaces/unit.interface";
import httpClient from "@/src/utils/httpClient";
import URLParamsHelper from "@/src/utils/URLParamsHelper";

// /unit/getAll?start=1&page_size=10&keywords=&month=8&year=2024&zoneId=1&type=W
// export const getUnitList = async (
// 	params: UnitParams
// ): Promise<UnitListFetchResponse | undefined> => {
// 	try {
// 		const res = await httpClient.get(
// 			`/api/unit/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}&customerId=${params.customerId}&date=${params.date}&zoneId=${params.zoneId}&type=${params.type}`
// 		);

// 		return res.data;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
export const getUnitList = async (
	params: UnitParams
): Promise<UnitListFetchResponse | undefined> => {
	const queryParams = new URLParamsHelper(params).toString();
	try {
		// const queryParams = new URLSearchParams(
		// 	Object.entries(params)
		// 		.filter(([, value]) => value !== undefined && value !== null)
		// 		.reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {})
		// ).toString();

		// console.log(first);

		// const res = await httpClient.get(`/api/unit/get-all?${queryParams}`);
		if (params.zoneId) {
			const res = await httpClient.get(
				`/api/unit/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}&customerId=${params.customerId}&date=${params.date}&zoneId=${params.zoneId}&type=${params.type}`
			);
			return res.data;
		}
	} catch (error) {
		console.error("Error fetching unit list:", error);
		throw new Error("Failed to fetch unit list");
	}
};

// /unit/updateOrCreate
export const updateOrCreateUnitList = async (
	values: UpdateOrCreateUnitList
) => {
	try {
		const res = await httpClient.put(`/api/unit/updateOrCreate`, values);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};
