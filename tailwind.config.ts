import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#95182E",
					50: "#faf5f5",
					200: "#FFF9FA",
					300: "#fcebee",
					800: "#6A1121",
				},
				gray: {
					700: "#707070",
					500: "#8D94A1",
					200: "#F2F2F2",
					100: "#F9FAFA",
				},
				secondary: {
					DEFAULT: "#C32A45",
				},
				green: {
					light: {
						500: "#9DAC29",
					},
				},
				success: "#0F9314",
				danger: "#C32A45",
			},
			gridTemplateColumns: {
				fluid: "repeat(auto-fit, minmax(16rem, 20fr))",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
};

export default config;
