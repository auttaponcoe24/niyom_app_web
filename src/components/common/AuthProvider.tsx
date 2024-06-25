"use client";
import { getSession, userSelector } from "@/src/store/slices/userSlice";
import { store } from "@/src/store/store";
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
	const reducer = useSelector(userSelector);
	const { isAuthenticated, isAuthenticating } = reducer;

	useEffect(() => {
		store.dispatch(getSession());
	}, []);

	// If fetching session (eg. show spinner)
	if (isAuthenticating === true) {
		// return null;
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

	// If user is not logged in, return login component
	if (path !== "/login" && path !== "/register") {
		if (!isAuthenticated) {
			// isAuthenticated === false
			router.push("/login");
			return null;
		} else if (path === "/") {
			router.push("/stock"); //default page after login when call root path
			return null;
		}
	} else {
		if (isAuthenticated) {
			// isAuthenticated === ture
			router.push("/stock"); // default page after login
			return null;
		}
	}

	return <div>{children}</div>;
}
