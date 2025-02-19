"use client";
import httpClient from "@/src/utils/httpClient";
import { Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const router = useRouter();
	const path = usePathname();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			httpClient
				.get(`/api/auth/session`, {
					baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
				})
				.then((res) => {
					// setAuthUser(res.data.user);
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}, []);

	// If fetching session (e.g., show spinner)
	if (isLoading) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<Spin size="default" />
			</div>
		);
	}

	return <div>{children}</div>;
}
