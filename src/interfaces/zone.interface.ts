export type TParams = {
	start: number;
	page_size: number;
	keywords?: string;
};

export type TZoneData = {
	id: number | null;
	zone_name?: string;
};

export type TMode = "create" | "edit" | "delete";
