import { TParams } from "@/src/interfaces/unit.interface";
import { GET_UNIT, UPDATE_OR_CREATE_UNIT } from "@/src/services/unit.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// GET_UNIT
export const useGetUnit = (params: TParams) => {
	return useQuery({
		queryKey: [
			"GET_UNIT",
			params.zoneId,
			params.month,
			params.year,
			params.type,
		],
		queryFn: async () => {
			if (!!params.zoneId && !!params.month && !!params.year && !!params.type) {
				return await GET_UNIT(params);
			}
			return null;
		},
		enabled:
			!!params.zoneId && !!params.month && !!params.year && !!params.type,
		retry: false,
	});
};

// UPDATE_OR_CREATE_UNIT
export const useUpdateOrCreateUnit = () => {
	return useMutation({
		mutationKey: ["UPDATE_OR_CREATE_UNIT"],
		mutationFn: async (values: any) => await UPDATE_OR_CREATE_UNIT(values),
	});
};
