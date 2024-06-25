import { NextRequest } from "next/server";

// GET
export async function GET(
	req: NextRequest,
	context: {
		params: {
			route: string;
		};
	}
) {
	const route = context.params.route;
}
