// "use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Menu, MenuItem } from "@mui/material";
import * as Icons from "@mui/icons-material";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

type Props = {
	open: boolean;
	handleDrawerOpen: () => void;
};

export default function Header({ open, handleDrawerOpen }: Props) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: 5,
						...(open && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton>
				{/* <Typography variant="h6" noWrap component="div">
					Mini variant drawer
				</Typography> */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "end",
						width: "100%",
					}}
				>
					<IconButton
						sx={{ margin: 0 }}
						id="basic-button"
						aria-controls={openMenu ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={openMenu ? "true" : undefined}
						onClick={handleClick}
					>
						<Icons.AccountCircle sx={{ fontSize: 40, color: "#272727" }} />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={openMenu}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<MenuItem onClick={handleClose}>Logout</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
