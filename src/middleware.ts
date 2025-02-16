import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
	const cookiesStore = cookies();
	const accessToken = cookiesStore.get("accessToken")?.value;

	const { pathname } = request.nextUrl;

	const isAuthPage = pathname === "/login" || pathname === "/register";
	const isRootPath = pathname === "/";

	// ถ้ามี access token และอยู่ในหน้า login, register หรือ root, เปลี่ยนเส้นทางไปหน้า main
	if (accessToken) {
		if (isAuthPage || isRootPath) {
			return NextResponse.redirect(new URL("/main", request.url));
		}
		return NextResponse.next();
	}

	// ถ้าไม่มี access token และพยายามเข้าถึงหน้าอื่นนอกจาก login หรือ register, เปลี่ยนเส้นทางไปหน้า login
	if (!isAuthPage) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// return NextResponse.next();
	return NextResponse.next({
		request,
	});
}

export const config = {
	matcher: [
		"/",
		"/login/:path*",
		"/register/:path*",
		"/main/:path*",
		"/zone/:path*",
		"/customer/:path*",
		"/unit/:path*",
		"/transaction/:path*",
		"/report/:path*",
	],
};
