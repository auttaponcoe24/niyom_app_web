import { TParams } from "@/src/interfaces/transaction.interface";
import httpClient from "@/src/utils/httpClient";

// /transaction/getAll?start=1&page_size=10&keywords=&month=8&year=2024&type=W&zoneId=1
export const GET_TRANSACTION = async (params: TParams) => {
	try {
		const res = await httpClient.get(
			`/transaction/getAll?start=${params.start}&page_size=${params.page_size}&keywords=${params.keywords}&month=${params.month}&year=${params.year}&type=${params.type}&zoneId=${params.zoneId}`
		);

		return res.data;
	} catch (error) {
		console.error;
	}
};
