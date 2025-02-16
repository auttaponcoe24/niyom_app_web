export interface UpdateOrCreatePrefix {
	id: number;
	prefixName: string;
}

export interface ParamsPrefix {
	start: number;
	pageSize: number;
	keywords: string;
}

export interface PrefixData {
	id: number;
	prefixName: string;
	createdAt: string;
	updatedAt: string;
}

export interface FetchPrefix {
	message: string;
	data: PrefixData[];
	total_record: number;
}
