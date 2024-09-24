import * as React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RootState, useAppDispatch } from "@/src/store/store";
import { signOut } from "@/src/store/slices/userSlice";
import {
	useLanguage,
	useSwitchMode,
} from "@/src/components/common/AppContextProvider";
import {
	Avatar,
	Dropdown,
	Layout,
	MenuProps,
	Select,
	Space,
	theme,
} from "antd";
import {
	DownOutlined,
	MoonOutlined,
	SunOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

const { Header } = Layout;

type Props = {};

export default function LayoutHeader({}: Props) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { username } = useSelector((state: RootState) => state.userSlice);
	const { messages } = useIntl();
	const { language, switchLanguage } = useLanguage();
	const { isDarkMode, switchDarkMode } = useSwitchMode();
	const {
		token: { colorTextBase, colorPrimary },
	} = theme.useToken();

	const handleOnSignOut = async () => {
		try {
			const result = await dispatch(signOut());

			if (result.meta.requestStatus === "fulfilled") {
				if (!!result.payload) {
					router.push("/login");
				} else {
					toast.error("ดำเนินการออกจากระบบไม่สำเร็จ");
				}
			} else {
				toast.error("ดำเนินการออกจากระบบไม่สำเร็จ");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const itemsSelect = [
		{
			label: "TH",
			value: "th-TH",
			key: 1,
		},
		{
			label: "EN",
			value: "en-US",
			key: 2,
		},
	];

	const itemsMenu: MenuProps["items"] = [
		{
			key: 0,
			label: (
				<div
					className="border-none bg-inherit text-md hover:cursor-pointer"
					onClick={() => handleOnSignOut()}
				>
					ออกจากระบบ
				</div>
			),
		},
	];

	return (
		<>
			<Header
				style={{
					position: "sticky",
					top: 0,
					zIndex: 99,
					height: 84,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					backgroundColor: colorPrimary,
					color: "#FFFFFF",
				}}
			>
				<div className="text-2xl">Logo</div>
				<div className="flex items-center justify-center gap-4">
					<div>
						{isDarkMode ? (
							<>
								<SunOutlined
									className="cursor-pointer text-xl"
									onClick={switchDarkMode}
								/>
							</>
						) : (
							<>
								<MoonOutlined
									className="cursor-pointer text-xl"
									onClick={switchDarkMode}
								/>
							</>
						)}
					</div>
					<div>
						<Select
							style={{
								width: 68,
							}}
							value={language}
							options={itemsSelect.map((item) => ({
								key: item.key,
								label: item.label,
								value: item.value,
							}))}
							onChange={(value: "th-TH" | "en-US") => switchLanguage(value)}
						/>
					</div>
					<Avatar size={36} icon={<UserOutlined />} />

					<>
						<Dropdown menu={{ items: itemsMenu }} trigger={["click"]}>
							<a onClick={(e) => e.preventDefault()}>
								<Space className="text-white">
									<div>{messages["text1"] as string}</div>
									<div>{username}</div>
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</>
				</div>
			</Header>
		</>
	);
}
