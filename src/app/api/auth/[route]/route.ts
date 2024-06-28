import { User } from "@/src/interfaces/auth.interface";
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
	const body = await req.json();
	if (route === "signin") {
		return signin(body);
	}
};

// ########### controllers #############

const signin = async (body: User) => {
	try {
		const res = await httpClient.post(`/auth/sign-in`, body);
		const { accessToken } = res.data;
		cookies().set(ACCESS_TOKEN_KEY, accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			path: "/",
		});
		return NextResponse.json(res.data);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "no" });
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
