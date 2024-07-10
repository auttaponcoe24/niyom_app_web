"use client";
import { useGetSession } from "@/src/hooks/useAuth";
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
	const {
		data: dataSession,
		isFetching: isFetchingSession,
		refetch: refetchSession,
	} = useGetSession();

	useEffect(() => {
		refetchSession();
	}, [refetchSession]);

	// If user is not logged in, return login component
	useEffect(() => {
		if (!isFetchingSession) {
			if (path !== "/login" && path !== "/register") {
				if (!dataSession) {
					// isAuthenticated === false
					router.push("/login");
				} else if (path === "/") {
					router.push("/main"); // default page after login when call root path
				}
			} else {
				if (dataSession) {
					// isAuthenticated === true
					router.push("/main"); // default page after login
				}
			}
		}
	}, [dataSession, isFetchingSession, path, router]);

	// If fetching session (e.g., show spinner)
	if (isFetchingSession) {
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
