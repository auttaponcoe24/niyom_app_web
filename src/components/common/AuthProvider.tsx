"use client";
import { getSession } from "@/src/store/slices/userSlice";
import { RootState, store, useAppDispatch } from "@/src/store/store";
import { Box, CircularProgress } from "@mui/material";
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

	const {
		data: dataUser,
		isAuthenticated,
		isAuthenticating,
	} = useSelector((state: RootState) => state.userSlice);

	useEffect(() => {
		if (!isAuthenticated) {
			dispatch(getSession());
		}
	}, [dispatch, isAuthenticated]);

	// Handle redirect based on authentication status and path
	useEffect(() => {
		if (isAuthenticating) return;

		if (path !== "/login" && path !== "/register") {
			if (!isAuthenticated) {
				router.push("/login");
			} else if (path === "/") {
				router.push("/main");
			}
		} else {
			if (isAuthenticated) {
				router.push("/main");
			}
		}
	}, [isAuthenticated, isAuthenticating, path, router]);

	// If fetching session (e.g., show spinner)
	if (isAuthenticating) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<CircularProgress color="primary" size={60} />
			</Box>
		);
	}

	return <div>{children}</div>;
}
