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
