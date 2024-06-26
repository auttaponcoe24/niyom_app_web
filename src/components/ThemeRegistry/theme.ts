import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});
let mode = "light";
let skin = "bordered";

const lightColor = "76, 78, 100";
const darkColor = "234, 234, 255";
const mainColor = mode === "light" ? lightColor : darkColor;

const defaultBgColor = () => {
	if (skin === "bordered" && mode === "light") {
		return "#FFF";
	} else if (skin === "bordered" && mode === "dark") {
		return "#30334E";
	} else if (mode === "light") {
		return "#F7F7F9";
	} else return "#282A42";
};

const drawerWidth = 240;
const theme = createTheme({
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					// backgroundImage: 'url("/static/img/background_menu.jpg")',
					backgroundRepeat: "no-repeat",
					backgroundPosition: "bottom",
					width: drawerWidth,
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: ({ ownerState }) => ({
					...(ownerState.severity === "info" && {
						backgroundColor: "#60a5fa",
					}),
				}),
			},
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	spacing: 8,
	palette: {
		common: {
			black: "#000",
			white: "#FFF",
		},
		mode: "light",
		primary: {
			light: "#787EFF",
			main: "#666CFF",
			dark: "#5A5FE0",
			contrastText: "#FFF",
		},
		secondary: {
			light: "#7F889B",
			main: "#6D788D",
			dark: "#606A7C",
			contrastText: "#FFF",
		},
		success: {
			light: "#83E542",
			main: "#72E128",
			dark: "#64C623",
			contrastText: "#FFF",
		},
		error: {
			light: "#FF625F",
			main: "#FF4D49",
			dark: "#E04440",
			contrastText: "#FFF",
		},
		warning: {
			light: "#FDBE42",
			main: "#FDB528",
			dark: "#DF9F23",
			contrastText: "#FFF",
		},
		info: {
			light: "#40CDFA",
			main: "#26C6F9",
			dark: "#21AEDB",
			contrastText: "#FFF",
		},
		grey: {
			50: "#FAFAFA",
			100: "#F5F5F5",
			200: "#EEEEEE",
			300: "#E0E0E0",
			400: "#BDBDBD",
			500: "#9E9E9E",
			600: "#757575",
			700: "#616161",
			800: "#424242",
			900: "#212121",
			A100: "#D5D5D5",
			A200: "#AAAAAA",
			A400: "#616161",
			A700: "#303030",
		},
		text: {
			primary: `rgba(${mainColor}, 0.87)`,
			secondary: `rgba(${mainColor}, 0.68)`,
			disabled: `rgba(${mainColor}, 0.38)`,
		},
		divider: `rgba(${mainColor}, 0.12)`,
		background: {
			paper: mode === "light" ? "#FFF" : "#30334E",
			default: defaultBgColor(),
		},
		action: {
			active: `rgba(${mainColor}, 0.54)`,
			hover: `rgba(${mainColor}, 0.05)`,
			hoverOpacity: 0.05,
			selected: `rgba(${mainColor}, 0.08)`,
			disabled: `rgba(${mainColor}, 0.26)`,
			disabledBackground: `rgba(${mainColor}, 0.12)`,
			focus: `rgba(${mainColor}, 0.12)`,
		},
	},
});

export default theme;
