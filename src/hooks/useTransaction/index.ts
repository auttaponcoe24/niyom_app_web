import {
	TParams,
	TUpdateOrCreateTransaction,
} from "@/src/interfaces/transaction.interface";
import {
	GET_TRANSACTION,
	UPDATE_OR_CREATE_TRANSACTION,
} from "@/src/services/trasaction.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// GET_TRASACTION
export const useGetTransaction = (params: TParams) => {
	return useQuery({
		queryKey: ["GET_TRASACTION"],
		queryFn: async () => {
			if (params.date && params.type && params.zoneId) {
				return await GET_TRANSACTION(params);
			}
			return null;
		},
		enabled: !!params.date && !!params.type && !!params.zoneId,
	});
};

// UPDATE_OR_CREATE_TRANSACTION
export const useUpdateOrCreateTransaction = () => {
	return useMutation({
		mutationKey: ["UPDATE_OR_CREATE_TRANSACTION"],
		mutationFn: async (values: TUpdateOrCreateTransaction[]) =>
			await UPDATE_OR_CREATE_TRANSACTION(values),
	});
};
