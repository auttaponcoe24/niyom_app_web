export interface TParams {
	start: number;
	page_size: number;
	keywords: string;
	date: string;
	zoneId: number;
	type: "W" | "E";
}

export type TGetDataTransaction = {
	id: number;
	date: string;
	month: string;
	year: string;
	type: "W" | "E";
	unitOldId: number;
	unitOld: {
		id: number;
		date: string;
		unitNumber: number;
	};
	unitNewId: number;
	unitNew: {
		id: number;
		date: string;
		unitNumber: number;
	};
	unitUsed: number;
	amount: number;
	overDue: number;
	totalPrice: number;
	status: "PENDING" | "SUCCESS" | "REJECT";
	customerId: string;
	zoneId: number;
	no: number;
	prefix: string;
	fullname: string;
	houseNumber: string;
	zoneName: string;
};

export type TUpdateOrCreateTransaction = {
	id: number;
	date: string;
	month: string;
	year: string;
	type: "W" | "E";
	unitOldId: number;
	unitNewId: number;
	unitUsed: number;
	amount: number;
	overDue: number;
	totalPrice: number;
	status: "PENDING" | "SUCCESS" | "REJECT";
	zoneId: number;
	customerId: string;
};
