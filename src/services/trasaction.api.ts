import {
	TGetDataTransaction,
	TransactionParams,
	TUpdateOrCreateTransaction,
	UpdateOrCreateTransactionList,
} from "@/src/interfaces/transaction.interface";
import httpClient from "@/src/utils/httpClient";

export const GET_TRANSACTION = async (
	params: TransactionParams
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
			`/api/transaction/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}&customerId=${params.customerId}&date=${params.date}&type=${params.type}&zoneId=${params.zoneId}`
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
	values: UpdateOrCreateTransactionList
) => {
	try {
		const res = await httpClient.put(`/api/transaction/updateOrCreate`, values);

		return res.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return error;
		}

		const fallbackError = new Error();
		return fallbackError;
	}
};

export const payTransaction = async (values: { id: number; pay: number }) => {
	const response = await httpClient.put(
		`/api/transaction/pay?id=${values.id}&pay=${values.pay}`
	);

	return response.data;
};
