export type TParams = {
	start: number;
	pageSize: number;
	keywords?: string;
};

export type TZoneData = {
	id: number | null;
	zone_name?: string;
};

export interface CreateZone {
	zoneName: string;
}

export interface UpdateZone extends CreateZone {
	id: number;
}

export interface ZoneData {
	no?: number;
	id: number;
	zoneName: string;
	createdAt: string;
	updatedAt: string;
}

export interface ZoneFetchResponse {
	message: string;
	data: ZoneData[];
	total_record: number;
}

export type TMode = "create" | "edit" | "delete";
