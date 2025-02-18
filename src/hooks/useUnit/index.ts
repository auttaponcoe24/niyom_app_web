import {
	UnitParams,
	UpdateOrCreateUnitList,
} from "@/src/interfaces/unit.interface";
import { getUnitList, updateOrCreateUnitList } from "@/src/services/unit.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// getUnitList
export const useGetUnitList = (params: UnitParams) => {
	return useQuery({
		queryKey: ["get-units"],
		queryFn: async () => await getUnitList(params),
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
