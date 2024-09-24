import { TParams } from "@/src/interfaces/transaction.interface";
import { GET_TRANSACTION } from "@/src/services/trasaction.api";
import { useQuery } from "@tanstack/react-query";

// GET_TRASACTION
export const useGetTransaction = (params: TParams) => {
	return useQuery({
		queryKey: [
			"GET_TRASACTION",
			params.month,
			params.year,
			params.type,
			params.zoneId,
		],
		queryFn: async () => {
			if (!!params.month && !!params.year && !!params.type && !!params.zoneId) {
				return await GET_TRANSACTION(params);
			}
			return null;
		},
		enabled:
			!!params.month && !!params.year && !!params.type && !!params.zoneId,
	});
};
