import {
	TransactionListFetchResponse,
	TransactionParams,
	UpdateOrCreateTransactionList,
} from "@/src/interfaces/transaction.interface";
import httpClient from "@/src/utils/httpClient";

export const getTransactions = async (
	params: TransactionParams
): Promise<TransactionListFetchResponse | undefined> => {
	try {
		const res = await httpClient.get(
			`/api/transaction/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}&customerId=${params.customerId}&date=${params.date}&type=${params.type}&zoneId=${params.zoneId}`
		);

		return res.data;
	} catch (error) {
		console.error(error);
		return;
	}
};

// /transaction/updateOrCreate
export const updateOrCreateTransaction = async (
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
