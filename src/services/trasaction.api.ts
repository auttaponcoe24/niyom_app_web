import {
	TGetDataTransaction,
	TParams,
	TUpdateOrCreateTransaction,
} from "@/src/interfaces/transaction.interface";
import httpClient from "@/src/utils/httpClient";

// /transaction/getAll?start=1&page_size=10&keywords=&month=8&year=2024&type=W&zoneId=1
// /transaction/getAll?start=1&page_size=10&keywords=&date=2024-09&type=W&zoneId=1
export const GET_TRANSACTION = async (
	params: TParams
): Promise<
	| {
			status: boolean;
			message: string;
			data: TGetDataTransaction[];
			total_record: number;
	  }
	| Error
> => {
	try {
		const res = await httpClient.get(
			`/transaction/getAll?start=${params.start}&page_size=${params.page_size}&keywords=${params.keywords}&date=${params.date}&type=${params.type}&zoneId=${params.zoneId}`
		);

		return res.data;
	} catch (error: unknown) {
		console.error;
		// return error
		if (error instanceof Error) {
			console.error("Error fetching transactions:", error.message);
			return error;
		}

		// Fallback for unknown error types
		const fallbackError = new Error("An unknown error occurred.");
		console.error(fallbackError.message);
		return fallbackError;
	}
};

// /transaction/updateOrCreate
export const UPDATE_OR_CREATE_TRANSACTION = async (
	values: TUpdateOrCreateTransaction[]
) => {
	try {
		const res = await httpClient.put(`/transaction/updateOrCreate`, values);

		return res.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return error;
		}

		const fallbackError = new Error();
		return fallbackError;
	}
};
