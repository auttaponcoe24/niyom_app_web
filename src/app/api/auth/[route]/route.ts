import { TSignIn } from "@/src/interfaces/auth.interface";
import { ACCESS_TOKEN_KEY } from "@/src/utils/constant";
import httpClient from "@/src/utils/httpClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ############# Routes #############
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
	if (route === "signout") {
		return signout(req);
	} else if (route === "session") {
		return getSession(req);
	}
	return NextResponse.json({ route });
}

// POST
export const POST = async (
	req: NextRequest,
	context: { params: { route: string } }
) => {
	const route = context.params.route;
	console.log("Route:", route); // Log route
	const body = await req.json();
	console.log("Request body:", body); // Log request body
	if (route === "signin") {
		return signin(body);
	}
	return NextResponse.json({ message: "Route not found" });
};

// ########### controllers #############

const signin = async (body: TSignIn) => {
	try {
		const res = await httpClient.post(`/auth/login`, body);
		const { token } = res.data;
		cookies().set(ACCESS_TOKEN_KEY, token);
		return NextResponse.json(res.data);
	} catch (error: any) {
		console.error(
			"Sign-in error:",
			error.response ? error.response.data : error.message
		); // Log detailed error
		return NextResponse.json({
			message: "Sign-in failed",
			error: error.response ? error.response.data : error.message,
		});
	}
};

const signout = async (req: NextRequest) => {
	try {
		const cookiesStore = cookies();
		cookiesStore.delete(ACCESS_TOKEN_KEY);
		return NextResponse.json({ message: "ok" });
	} catch (error) {
		return NextResponse.json({ message: "no" });
	}
};

const getSession = async (req: NextRequest) => {
	try {
		const cookiesStore = cookies();
		const accessTokenKey = cookiesStore.get(ACCESS_TOKEN_KEY);
		if (!!accessTokenKey?.value) {
			const res = await httpClient.get(`/auth/profile`, {
				headers: {
					Authorization: `Bearer ${accessTokenKey?.value}`,
				},
			});

			return NextResponse.json(res.data);
		} else {
			return NextResponse.json({ message: "no" });
		}
	} catch (error) {
		return NextResponse.json({ message: "no" });
	}
};
