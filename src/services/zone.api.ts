import httpClient from "@/src/utils/httpClient";

// /zone/create
export const CREATE_ZONE = async (values: { zone_name: string }) => {
	try {
		const res = await httpClient.post(`/zone/create`, values);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// /getAll
export const GET_ZONE = async () => {
	try {
		const res = await httpClient.get(`/zone/getAll`);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
