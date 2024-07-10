import { CREATE_ZONE, GET_ZONE } from "@/src/services/zone.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// CREATE_ZONE
export const useCreateZone = () => {
	return useMutation({
		mutationKey: ["create-zone"],
		mutationFn: (values: { zone_name: string }) => CREATE_ZONE(values),
	});
};

// GET_ZONE
export const useGetZone = () => {
	return useQuery({
		queryKey: ["get_zone"],
		queryFn: async () => await GET_ZONE(),
	});
};
