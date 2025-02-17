import React, { Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useIntl } from "react-intl";
import {
	MdOutlineDashboardCustomize,
	MdOutlineLocationOn,
	MdOutlineReceiptLong,
	MdOutlineWaterDrop,
} from "react-icons/md";
const { Sider } = Layout;
import { FaBolt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";

type Props = {
	selectKey: string[];
	setSelectKey: Dispatch<SetStateAction<string[]>>;
};

export default function LayoutSidebar({ selectKey, setSelectKey }: Props) {
	const pathname = usePathname();
	const { messages } = useIntl();
	// const [selectKey, setSelectKey] = useState(["0"]);

	// console.log("pathname=>", pathname);

	useEffect(() => {
		if (pathname.includes("/zone")) {
			setSelectKey(["1"]);
		} else if (pathname.includes(`/customer`)) {
			setSelectKey(["2"]);
		} else if (pathname.includes("/unit")) {
			setSelectKey(["3"]);
		} else if (pathname.includes("/transaction")) {
			setSelectKey(["4"]);
		} else {
			setSelectKey(["0"]);
		}
	}, [pathname]);

	const itemsMenu: MenuProps["items"] = [
		{
			key: 0,
			icon: <MdOutlineDashboardCustomize size={20} />,
			label: <Link href={`/main`}>{messages["sidebar.main"] as string}</Link>,
		},
		{
			key: 1,
			icon: <MdOutlineLocationOn size={20} />,
			label: <Link href={`/zone`}>{messages["sidebar.zone"] as string}</Link>,
		},
		{
			key: 2,
			icon: <AiOutlineUser style={{ fontSize: 20 }} />,
			label: (
				<Link href={`/customer`}>{messages["sidebar.customer"] as string}</Link>
			),
		},
		{
			key: 3,
			icon: (
				<div>
					<MdOutlineWaterDrop size={10} /> /
					<FaBolt size={10} />
				</div>
			),
			label: <Link href={`/unit`}>{messages["sidebar.unit"] as string}</Link>,
		},
		{
			key: 4,
			icon: <MdOutlineReceiptLong size={20} />,
			label: (
				<Link href={`/transaction`}>
					{messages["sidebar.transaction"] as string}
				</Link>
			),
		},
		{
			key: 5,
			icon: <TbReportAnalytics size={20} />,
			label: (
				<Link href={`/report`}>{messages["sidebar.report"] as string}</Link>
			),
		},
	];

	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Sider
			breakpoint="md"
			width={200}
			trigger={true}
			style={{
				background: colorBgContainer,
				position: "fixed",
				top: 84,
				left: 0,
				height: "calc(100vh - 84px)",
			}}
		>
			<Menu
				mode="inline"
				// defaultSelectedKeys={selectKey}
				selectedKeys={selectKey}
				items={itemsMenu}
			/>
		</Sider>
	);
}
