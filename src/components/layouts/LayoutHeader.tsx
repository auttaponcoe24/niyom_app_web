import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
	useLanguage,
	useSwitchMode,
} from "@/src/components/common/AppContextProvider";
import {
	Avatar,
	Button,
	Drawer,
	Dropdown,
	Layout,
	MenuProps,
	notification,
	Select,
	Space,
	theme,
} from "antd";
import {
	DashboardOutlined,
	DownOutlined,
	FormOutlined,
	HomeOutlined,
	InsertRowBelowOutlined,
	MoonOutlined,
	SunOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useIntl } from "react-intl";
import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Link from "next/link";
import { useSession, useSignOut } from "@/src/hooks/useAuth";
import { SIGN_OUT } from "@/src/services/auth.api";
import Image from "next/image";

const { Header } = Layout;

type Props = {
	setSelectKey: Dispatch<SetStateAction<string[]>>;
};

export default function LayoutHeader({ setSelectKey }: Props) {
	const router = useRouter();
	const { messages } = useIntl();
	const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
	const { language, switchLanguage } = useLanguage();
	const { isDarkMode, switchDarkMode } = useSwitchMode();
	const {
		token: { colorTextBase, colorPrimary },
	} = theme.useToken();

	const {
		data: dataSession,
		isLoading: isLoadingSession,
		isFetching: isFetchingSession,
		refetch: refetchSession,
	} = useSession();

	const handleOnSignOut = async () => {
		try {
			const res = await SIGN_OUT();
			if (res) {
				notification.success({
					message: "Login Out",
				});
				localStorage.removeItem("user");
				localStorage.removeItem("accessToken");
				router.push("/login");
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

	const handleOnCloseDrawer = () => {
		setIsOpenDrawer(false);
	};

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
					backgroundColor: "#00435E",
					// backgroundColor: colorPrimary,
				}}
			>
				<div className="text-2xl hidden md:block">
					<Image
						src={`/images/logo.svg`}
						alt="logo"
						width={40}
						height={40}
						priority // เพิ่ม priority เพื่อลดเวลาโหลด
					/>
				</div>
				<Button
					className="!text-white md:!hidden !bg-inherit"
					type="text"
					icon={<HiOutlineBars3 size={30} />}
					onClick={() => {
						setIsOpenDrawer(true);
					}}
				/>

				<div className="flex items-center justify-center gap-4">
					<div className="hidden md:block">
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
					<div className="hidden md:block">
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
									{dataSession ? (
										<div>{dataSession?.data?.firstName}</div>
									) : (
										<div>{messages["text1"] as string}</div>
									)}

									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</>
				</div>
			</Header>

			<Drawer
				// title="Basic Drawer"
				onClose={handleOnCloseDrawer}
				open={isOpenDrawer}
				placement="left"
				closeIcon={null}
			>
				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col items-center justify-center gap-4 mt-4">
						<button
							onClick={() => {
								router.push(`/main`);
								setIsOpenDrawer(false);
								setSelectKey(["0"]);
							}}
							className={`flex items-center justify-center gap-2 w-full py-2 border-none bg-inherit transition-all  hover:bg-primary hover:text-white rounded-md cursor-pointer ${
								isDarkMode ? "text-white" : "text-black"
							}`}
						>
							<HomeOutlined style={{ fontSize: 20 }} />
							<div>{messages["sidebar.main"] as string}</div>
						</button>
						<button
							onClick={() => {
								router.push("/zone");
								setIsOpenDrawer(false);
								setSelectKey(["1"]);
							}}
							className={`flex items-center justify-center gap-2 w-full py-2 border-none bg-inherit transition-all  hover:bg-primary hover:text-white rounded-md cursor-pointer ${
								isDarkMode ? "text-white" : "text-black"
							}`}
						>
							<DashboardOutlined style={{ fontSize: 20 }} />
							<div>{messages["sidebar.zone"] as string}</div>
						</button>
						<button
							onClick={() => {
								router.push("/customer");
								setIsOpenDrawer(false);
								setSelectKey(["2"]);
							}}
							className={`flex items-center justify-center gap-2 w-full py-2 border-none bg-inherit transition-all  hover:bg-primary hover:text-white rounded-md cursor-pointer ${
								isDarkMode ? "text-white" : "text-black"
							}`}
						>
							<UserOutlined style={{ fontSize: 20 }} />
							<div>{messages["sidebar.customer"] as string}</div>
						</button>
						<button
							onClick={() => {
								router.push("/unit");
								setIsOpenDrawer(false);
								setSelectKey(["3"]);
							}}
							className={`flex items-center justify-center gap-2 w-full py-2 border-none bg-inherit transition-all  hover:bg-primary hover:text-white rounded-md cursor-pointer ${
								isDarkMode ? "text-white" : "text-black"
							}`}
						>
							<FormOutlined style={{ fontSize: 20 }} />
							<div>{messages["sidebar.unit"] as string}</div>
						</button>
						<button
							onClick={() => {
								router.push("/transaction");
								setIsOpenDrawer(false);
								setSelectKey(["4"]);
							}}
							className={`flex items-center justify-center gap-2 w-full py-2 border-none bg-inherit transition-all  hover:bg-primary hover:text-white rounded-md cursor-pointer ${
								isDarkMode ? "text-white" : "text-black"
							}`}
						>
							<InsertRowBelowOutlined style={{ fontSize: 20 }} />
							<div>{messages["sidebar.transaction"] as string}</div>
						</button>
					</div>
					<div className="flex items-center justify-end">
						<Button
							type="text"
							htmlType="button"
							onClick={() => handleOnSignOut()}
							className="!text-md"
						>
							ออกจากระบบ
						</Button>
					</div>
				</div>
			</Drawer>
		</>
	);
}
