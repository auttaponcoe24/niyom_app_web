import {
	UnitParams,
	UpdateOrCreateUnitList,
} from "@/src/interfaces/unit.interface";
import { getUnitList, updateOrCreateUnitList } from "@/src/services/unit.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// getUnitList
export const useGetUnitList = (params: UnitParams) => {
	return useQuery({
		queryKey: [
			"get-units",
			params.start,
			params.pageSize,
			params.date,
			params.zoneId,
			params.type,
		],
		queryFn: async () => await getUnitList(params),
		enabled:
			!!params.start &&
			!!params.pageSize &&
			!!params.date &&
			!!params.zoneId &&
			!!params.type,
	});
};

// updateOrCreateUnitList
export const useUpdateOrCreateUnitList = () => {
	return useMutation({
		mutationKey: ["update-create-units"],
		mutationFn: async (values: UpdateOrCreateUnitList) =>
			await updateOrCreateUnitList(values),
	});
};
