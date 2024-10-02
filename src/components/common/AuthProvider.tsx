"use client";
import { getSession } from "@/src/store/slices/userSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const router = useRouter();
	const path = usePathname();
	const dispatch = useAppDispatch();

	const { isAuthenticated, isAuthenticating, accessToken } = useSelector(
		(state: RootState) => state.userSlice
	);

	useEffect(() => {
		dispatch(getSession());
	}, [dispatch, accessToken]);

	// Handle redirect based on authentication status and path
	useEffect(() => {
		if (!isAuthenticating) {
			if (!isAuthenticated && path !== "/login" && path !== "/register") {
				router.push("/login");
			} else if (
				isAuthenticated &&
				(path === "/login" || path === "/register" || path === "/")
			) {
				router.push("/main");
			}
		}
	}, [isAuthenticated, isAuthenticating, path, router]);

	// If fetching session (e.g., show spinner)
	if (isAuthenticating) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<Spin size="large" />
			</div>
		);
	}

	return <div>{children}</div>;
}
