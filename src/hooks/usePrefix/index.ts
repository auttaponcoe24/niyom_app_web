import { ParamsPrefix } from "@/src/interfaces/prefix.interface";
import { GET_PREFIX } from "@/src/services/prefix.api";
import { useQuery } from "@tanstack/react-query";

// GET_PREFIX
export const useGetPrefixList = (pamras: ParamsPrefix) => {
	return useQuery({
		queryKey: ["get-prefixes"],
		queryFn: async () => await GET_PREFIX(pamras),
	});
};
