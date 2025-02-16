export interface UnitParams {
	start: number;
	pageSize: number;
	keywords: string;
	customerId: string;
	date: string;
	zoneId: number;
	type: "W" | "E";
}

export interface UpdateOrCreateUnit {
	id: number;
	date: string;
	type: "W" | "E";
	unitNumber: number;
	customerId: string;
	zoneId: number;
}

export interface UpdateOrCreateUnitList extends Array<UpdateOrCreateUnit> {}
