import { CREATE_ZONE } from "@/src/services/zone.api";
import { useMutation } from "@tanstack/react-query";

// CREATE_ZONE
export const useCreateZone = () => {
	return useMutation({
		mutationKey: ["create-zone"],
		mutationFn: (values: { zone_name: string }) => CREATE_ZONE(values),
	});
};
