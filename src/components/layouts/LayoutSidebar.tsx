import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, MenuProps, theme } from "antd";
import {
	DashboardOutlined,
	FormOutlined,
	HomeOutlined,
	InsertRowBelowOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useIntl } from "react-intl";
const { Sider } = Layout;

type Props = {};

export default function LayoutSidebar({}: Props) {
	const pathname = usePathname();
	const { messages } = useIntl();
	const [selectKey, setSelectKey] = useState(["0"]);

	useEffect(() => {
		if (pathname.startsWith("/zone")) {
			setSelectKey(["1"]);
		} else if (pathname.startsWith(`/customer`)) {
			setSelectKey(["2"]);
		} else if (pathname.startsWith("/unit")) {
			setSelectKey(["3"]);
		} else if (pathname.startsWith("/transaction")) {
			setSelectKey(["4"]);
		} else {
			setSelectKey(["0"]);
		}
	}, [pathname]);

	const itemsMenu: MenuProps["items"] = [
		{
			key: 0,
			icon: <HomeOutlined style={{ fontSize: 20 }} />,
			label: <Link href={`/main`}>{messages["sidebar.main"] as string}</Link>,
		},
		{
			key: 1,
			icon: <DashboardOutlined style={{ fontSize: 20 }} />,
			label: <Link href={`/zone`}>{messages["sidebar.zone"] as string}</Link>,
		},
		{
			key: 2,
			icon: <UserOutlined style={{ fontSize: 20 }} />,
			label: (
				<Link href={`/customer`}>{messages["sidebar.customer"] as string}</Link>
			),
		},
		{
			key: 3,
			icon: <FormOutlined style={{ fontSize: 20 }} />,
			label: <Link href={`/unit`}>{messages["sidebar.unit"] as string}</Link>,
		},
		{
			key: 4,
			icon: <InsertRowBelowOutlined style={{ fontSize: 20 }} />,
			label: (
				<Link href={`/transaction`}>
					{messages["sidebar.transaction"] as string}
				</Link>
			),
		},
	];

	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Sider
			style={{
				background: colorBgContainer,
				position: "fixed",
				top: 84,
				left: 0,
				height: "calc(100vh - 84px)",
			}}
		>
			<Menu mode="inline" defaultSelectedKeys={selectKey} items={itemsMenu} />
		</Sider>
	);
}
