export interface TransactionParams
	extends Record<string, string | number | undefined> {
	start?: number;
	pageSize?: number;
	keywords?: string;
	customerId?: string;
	date?: string;
	type?: "W" | "E";
	zoneId?: number;
}

export interface TransactionData {
	id: number;
	date: string;
	type: "W" | "E";
	unitOldId: number;
	unitOld: {
		id: number;
		date: string;
		type: "W" | "E";
		unitNumber: number;
		customerId: string;
		zoneId: number;
	};
	unitNewId: number;
	unitNew: {
		id: number;
		date: string;
		type: "W" | "E";
		unitNumber: number;
		customerId: string;
		zoneId: number;
	};
	unitUsed: number;
	amount: number;
	overDue: number;
	total: number;
	pay: number;
	remain: number;
	status: "PAY" | "WAITING";
	customerId: string;
	zoneId: number;
	approved: {
		id: string;
		firstName: string;
		lastName: string;
	};
	approvedAt: string;
	no: number;
	prefix: string;
	fullName: string;
	houseNumber: string;
	zoneName: string;
}

export interface TransactionListFetchResponse {
	status: boolean;
	message: string;
	data: TransactionData[];
	total_record: number;
}

export type UpdateOrCreateTransaction = {
	id: number;
	date: string;
	type: "W" | "E";
	unitOldId: number;
	unitNewId: number;
	unitUsed: number;
	amount: number;
	overDue: number;
	total: number;
	pay: number;
	remain: number;
	status: "WAITING" | "PAY";
	customerId: string;
	zoneId: number;
};

export interface UpdateTransactionId {
	transactionId: number;
	unitNumberOld: number;
	unitNumberNew: number;
	unitUsed: number;
	amount: number;
	overDue: number;
	total: number;
}

export interface UpdateOrCreateTransactionList
	extends Array<UpdateOrCreateTransaction> {}

export type TransactionMode =
	| "view"
	| "create"
	| "edit"
	| "delete"
	| "pay"
	| null;
