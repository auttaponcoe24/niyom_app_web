"use client";
import React, { useState } from "react";

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
	const [selectKey, setSelectKey] = useState(["0"]);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<LayoutHeader setSelectKey={setSelectKey} />

			<Layout hasSider>
				<LayoutSidebar selectKey={selectKey} setSelectKey={setSelectKey} />

				{/* <Layout style={{ padding: "24px", marginLeft: 200 }}> */}
				<Layout className="p-6 ml-20 md:ml-[200px]">
					<Layout.Content>{children}</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
