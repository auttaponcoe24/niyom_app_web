import httpClient from "@/src/utils/httpClient";

export const GET_PREFIX = async () => {
	try {
		const res = await httpClient.get(
			`/prefix/getAll?start=1&page_size=999&keywords=`
		);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};
