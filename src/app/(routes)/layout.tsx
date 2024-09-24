"use client";
import React from "react";

import LayoutHeader from "@/src/components/layouts/LayoutHeader";
import LayoutSidebar from "@/src/components/layouts/LayoutSidebar";
import { Layout, theme } from "antd";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {
	textAlign: "center",
	minHeight: 120,
	lineHeight: "120px",
	color: "#fff",
	backgroundColor: "#0958d9",
};

const layoutStyle = {
	// borderRadius: 8,
	overflow: "hidden",
	width: "100%",
	// maxWidth: "calc(50% - 8px)",
};

export default function RoutesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const {
		token: { colorBgContainer, borderRadiusLG, boxShadow },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<LayoutHeader />

			<Layout hasSider>
				<LayoutSidebar />

				<Layout style={{ padding: "24px", marginLeft: 200 }}>
					<Layout.Content>{children}</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
