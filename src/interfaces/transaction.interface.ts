export interface TransactionParams {
	start: number;
	pageSize: number;
	keywords: string;
	customerId: string;
	date: string;
	type: "W" | "E";
	zoneId: number;
}

export type TGetDataTransaction = {
	id: number;
	date: string;
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
	pay: number;
	overDue: number;
	total: number;
	status: "WAINING" | "PAY";
	customerId: string;
	zoneId: number;
	approved: string;
	approvedAt: string;
	no: number;
	prefix: string;
	fullname: string;
	houseNumber: string;
	zoneName: string;
};

export type TUpdateOrCreateTransaction = {
	id: number;
	date: string;
	type: "W" | "E";
	unitOldId: number;
	unitNewId: number;
	unitUsed: number;
	amount: number;
	overDue: number;
	pay: number;
	total: number;
	status: "WAINING" | "PAY";
	customerId: string;
	zoneId: number;
};

export interface UpdateOrCreateTransactionList
	extends Array<TUpdateOrCreateTransaction> {}
