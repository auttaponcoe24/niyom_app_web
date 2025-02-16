import {
	CreateZone,
	TParams,
	UpdateZone,
} from "@/src/interfaces/zone.interface";
import {
	CREATE_ZONE,
	DELETE_ZONE,
	GET_BY_ID,
	GET_ZONE,
	UPDATE_ZONE,
} from "@/src/services/zone.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// CREATE_ZONE
export const useCreateZone = () => {
	return useMutation({
		mutationKey: ["create-zone"],
		mutationFn: async (values: CreateZone) => await CREATE_ZONE(values),
	});
};

// GET_ZONE
export const useGetZone = (params: TParams) => {
	return useQuery({
		queryKey: ["get-zone"],
		queryFn: async () => await GET_ZONE(params),
	});
};

// GET_BY_ID
export const useGetZoneById = (id: number) => {
	return useQuery({
		queryKey: ["get-zone-by-id", id],
		queryFn: async () => await GET_BY_ID(id),
		enabled: !!id,
	});
};

// UPDATE_ZONE
export const useUpdateZone = () => {
	return useMutation({
		mutationKey: ["update-zone"],
		mutationFn: async (values: UpdateZone) => await UPDATE_ZONE(values),
	});
};

// DELETE_ZONE
export const useDeleteZone = () => {
	return useMutation({
		mutationKey: ["delete-zone"],
		mutationFn: async (id: number) => await DELETE_ZONE(id),
	});
};
