import {
	TransactionListFetchResponse,
	TransactionParams,
	UpdateOrCreateTransactionList,
	UpdateTransactionId,
} from "@/src/interfaces/transaction.interface";
import httpClient from "@/src/utils/httpClient";

export const getTransactions = async (
	params: TransactionParams
): Promise<TransactionListFetchResponse | undefined> => {
	try {
		if (params.zoneId) {
			const res = await httpClient.get(
				`/api/transaction/get-all?start=${params.start}&pageSize=${params.pageSize}&keywords=${params.keywords}&customerId=${params.customerId}&date=${params.date}&type=${params.type}&zoneId=${params.zoneId}`
			);

			return res.data;
		}
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

export const updateTransactionId = async (values: UpdateTransactionId) => {
	const { transactionId: _, ...update } = values;
	const response = await httpClient.patch(
		`/api/transaction/update/${values.transactionId}`,
		update
	);

	return response.data;
};

export const payTransaction = async (values: { id: number; pay: number }) => {
	const response = await httpClient.put(
		`/api/transaction/pay?id=${values.id}&pay=${values.pay}`
	);

	return response.data;
};
