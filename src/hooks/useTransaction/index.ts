import {
	TransactionParams,
	UpdateOrCreateTransactionList,
	UpdateTransactionId,
} from "@/src/interfaces/transaction.interface";
import {
	getTransactions,
	payTransaction,
	updateOrCreateTransaction,
	updateTransactionId,
} from "@/src/services/trasaction.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// /api/transaction/get-all?start=1&pageSize=10&keywords=&customerId=&date=2024-09-01&type=E&zoneId=1
export const useGetTransactions = (
	params: TransactionParams,
	zoneId: number
) => {
	return useQuery({
		queryKey: ["get-transactions", zoneId],
		queryFn: async () => {
			if (zoneId) {
				return await getTransactions(params);
			} else return { data: [], total_record: 0 };
		},
		enabled: !!zoneId,
		//staleTime: 1000 * 60 * 5, // cache ไว้ 5 นาที
	});
};

// /api/transaction/updateOrCreate
export const useUpdateOrCreateTransaction = () => {
	return useMutation({
		mutationKey: ["updateorcreate-transactions"],
		mutationFn: async (values: UpdateOrCreateTransactionList) =>
			await updateOrCreateTransaction(values),
	});
};

// updateTransactionId
export const useUpdateTransactionId = () => {
	return useMutation({
		mutationKey: ["update-transactionId"],
		mutationFn: async (values: UpdateTransactionId) =>
			await updateTransactionId(values),
	});
};

// /api/transaction/pay?id=1&pay=50
export const usePayTransaction = () => {
	return useMutation({
		mutationKey: ["pay-transaction"],
		mutationFn: async (values: { id: number; pay: number }) =>
			await payTransaction(values),
	});
};

// /api/transaction/getById?id=1
