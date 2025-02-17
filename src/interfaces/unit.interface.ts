import moment from "moment";

export interface UnitParams
	extends Record<string, string | number | undefined> {
	start?: number;
	pageSize?: number;
	keywords?: string;
	customerId?: string;
	date?: string;
	zoneId?: number;
	type?: "W" | "E";
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

export interface UnitData {
	id: number;
	date: string;
	type: "E" | "W";
	unitNumber: number;
	customerId: string;
	zoneId: number;
	no: number;
	prefix: string;
	fullName: string;
	houseNumber: string;
}

export interface UnitListFetchResponse {
	status: boolean;
	message: string;
	data: UnitData[];
	total_record: number;
}

export type UnitMode = "view" | "create" | "edit" | "delete" | null;

export enum UnitModeEnum {
	View = "view",
	Create = "create",
	Edit = "edit",
	Delete = "delete",
}
