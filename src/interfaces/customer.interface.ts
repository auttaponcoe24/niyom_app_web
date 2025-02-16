export type CreateCustomer = {
	no: number;
	prefixId: number;
	firstName: string;
	lastName: string;
	cardId: string;
	phoneNumber: string;
	houseNumber: string;
	address: string;
	zoneId: number;
	isServiceWater: boolean;
	isServiceElectric: boolean;
	isActive: boolean;
};

export interface UpdateCustomer extends CreateCustomer {
	id: string;
}

export type CustomerParams = {
	start: number;
	pageSize: number;
	keywords?: string;
	zoneId: number;
};

export interface CustomerData {
	idx?: number;
	no: number;
	id: string;
	firstName: string;
	lastName: string;
	cardId: string;
	phoneNumber: string;
	houseNumber: string;
	address: string;
	isActive: boolean;
	isServiceWater: boolean;
	isServiceElectric: boolean;
	zone: {
		id: number;
		zoneName: string;
	};
	prefix: {
		id: number;
		prefixName: string;
	};
}

export interface CustomerFetchResponse {
	message: string;
	total_record: number;
	data: CustomerData[];
}

export type CustomerMode = "create" | "edit" | "delete" | null;
