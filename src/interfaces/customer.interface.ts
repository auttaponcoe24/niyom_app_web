export type TActionValues = {
	id?: number;
	firstname: string;
	lastname?: string;
	card_id: string;
	phone?: string;
	house_number?: string;
	address: string;
	zoneId: number | null;
	prefixId: number | null;
};

export type TParams = {
	start: number;
	page_size: number;
	keywords?: string;
};

export type TMode = "create" | "edit" | "delete" | null;
