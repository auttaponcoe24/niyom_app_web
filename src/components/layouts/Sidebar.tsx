import DrawerHeader from "@/src/components/layouts/DrawerHeader";
import {
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Theme,
	styled,
	CSSObject,
} from "@mui/material";
import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
	AddBusiness,
	AppRegistration,
	Assessment,
	BarChart,
	Layers,
	MoneyOffCsredRounded,
	Person,
	Report,
	TranscribeSharp,
	ListAlt,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

type Props = {
	theme: Theme;
	open: boolean;
	handleDrawerClose: () => void;
};

const routesList = [
	{ pathname: "/main", text: "หน้าหลัก", icon: <Layers /> },
	{ pathname: "/zone", text: "จัดการเขต", icon: <AddBusiness /> },
	{ pathname: "/customer", text: "จัดการลูกค้า", icon: <Person /> },
	{
		pathname: "/transaction",
		text: "จัดการธุรกรรม",
		icon: <AppRegistration />,
	},
	{
		pathname: "/transaction-order",
		text: "รายการธุรกรรม",
		icon: <ListAlt />,
	},
	{ pathname: "/report", text: "รายงาน", icon: <Assessment /> },
];
const CustomLink = styled(
	Link,
	{}
)(() => ({
	textDecoration: "none",
	color: "black",
}));

export default function Sidebar({ theme, open, handleDrawerClose }: Props) {
	const pathname = usePathname();
	return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "rtl" ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{routesList.map((route) => {
					return (
						<CustomLink href={route.pathname} passHref key={route.text}>
							<ListItemButton selected={pathname === route.pathname}>
								<ListItemIcon>{route.icon}</ListItemIcon>
								<ListItemText primary={route.text} />
							</ListItemButton>
						</CustomLink>
					);
				})}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}
