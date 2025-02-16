import {
	CreateCustomer,
	CustomerParams,
	UpdateCustomer,
} from "@/src/interfaces/customer.interface";
import {
	CREATE_CUSTOMER,
	DELETE_CUSTOMER,
	GET_CUSTOMER_ALL,
	GET_CUSTOMER_ID,
	UPDATE_CUSTOMER,
} from "@/src/services/customer.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// GET_CUSTOMER_ALL
export const useGetCustomers = (params: CustomerParams) => {
	return useQuery({
		queryKey: ["get-customers"],
		queryFn: async () => await GET_CUSTOMER_ALL(params),
	});
};

// CREATE_CUSTOMER
export const useCreateCustomer = () => {
	return useMutation({
		mutationKey: ["create-customer"],
		mutationFn: async (values: CreateCustomer) => await CREATE_CUSTOMER(values),
	});
};

// GET_CUSTOMER_ID
export const useGetCustomerId = (id: string) => {
	return useQuery({
		queryKey: ["get-customer-id", id],
		queryFn: async () => await GET_CUSTOMER_ID(id),
		enabled: !!id,
	});
};

// UPDATE_CUSTOMER
export const useUpdateCustomer = () => {
	return useMutation({
		mutationKey: ["update-customer"],
		mutationFn: async (values: UpdateCustomer) => await UPDATE_CUSTOMER(values),
	});
};

// DELETE_CUSTOMER
export const useDeleteCustomer = () => {
	return useMutation({
		mutationKey: ["delete-customer"],
		mutationFn: async (id: string) => await DELETE_CUSTOMER(id),
	});
};
