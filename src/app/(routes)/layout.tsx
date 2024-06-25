"use client";
import DrawerHeader from "@/src/components/layouts/DrawerHeader";
import Header from "@/src/components/layouts/Header";
import Sidebar from "@/src/components/layouts/Sidebar";
import { Box, CssBaseline, styled, useTheme } from "@mui/material";
import { useState } from "react";

export default function RoutesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = useTheme();
	const [open, setOpen] = useState<boolean>(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<section>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				{/* Header */}
				<Header open={open} handleDrawerOpen={handleDrawerOpen} />

				{/* Sidebar */}
				<Sidebar
					theme={theme}
					open={open}
					handleDrawerClose={handleDrawerClose}
				/>

				{/* Content */}
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					{/* <React.Suspense fallback={<Loading />}>{children}</React.Suspense> */}
					{children}
				</Box>
			</Box>
		</section>
	);
}
