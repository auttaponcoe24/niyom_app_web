import { ACCESS_TOKEN_KEY } from "@/src/utils/constant";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
	const cookiesStore = cookies();
	const accessTokenKey = cookiesStore.get(ACCESS_TOKEN_KEY);

	const path = req.nextUrl.pathname;

	if (accessTokenKey && accessTokenKey.value) {
		if (path === "/login" || path === "/register" || path === "/") {
			return NextResponse.redirect(new URL("/main", req.url));
		}

		return NextResponse.next({ request: req });
	} else if (path !== "/login" && path !== "/register") {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next({ request: req });
}

export const config = {
	matcher: ["/", "/login/:path*", "/register/:path*", "/main/:path*"],
};
