import {
	FetchPrefix,
	ParamsPrefix,
	UpdateOrCreatePrefix,
} from "@/src/interfaces/prefix.interface";
import httpClient from "@/src/utils/httpClient";

export const updateOrCreatePrefix = async (values: UpdateOrCreatePrefix) => {
	const response = await httpClient.post(`/api/prefix/create`, values);

	return response.data;
};

export const GET_PREFIX = async (
	pamras: ParamsPrefix
): Promise<FetchPrefix> => {
	const res = await httpClient.get(
		`/api/prefix/get-all?start=${pamras.start}&pageSize=${pamras.pageSize}&keywords=${pamras.keywords}`
	);

	return res.data;
};
