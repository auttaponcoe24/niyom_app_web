import {
	TransactionParams,
	UpdateOrCreateTransactionList,
} from "@/src/interfaces/transaction.interface";
import {
	getTransactions,
	payTransaction,
	updateOrCreateTransaction,
} from "@/src/services/trasaction.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// /api/transaction/get-all?start=1&pageSize=10&keywords=&customerId=&date=2024-09-01&type=E&zoneId=1
export const useGetTransactions = (params: TransactionParams) => {
	return useQuery({
		queryKey: ["get-transactions"],
		queryFn: async () => await getTransactions(params),
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

// /api/transaction/pay?id=1&pay=50
export const usePayTransaction = () => {
	return useMutation({
		mutationKey: ["pay-transaction"],
		mutationFn: async (values: { id: number; pay: number }) =>
			await payTransaction(values),
	});
};

// /api/transaction/getById?id=1
