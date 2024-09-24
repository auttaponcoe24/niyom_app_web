"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

// กำหนดชนิดข้อมูลของ Context
type AppContextType = {
	language: "th-TH" | "en-US";
	switchLanguage: (lang: "th-TH" | "en-US") => void;
	isDarkMode: boolean;
	switchDarkMode: () => void;
};

type Props = {
	children: ReactNode;
};

// สร้าง Context พร้อมกำหนดค่าเริ่มต้น (default)
const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: Props) {
	const [language, setLanguage] = useState<"th-TH" | "en-US">("th-TH");
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

	// ฟังก์ชันสำหรับเปลี่ยนภาษา
	const switchLanguage = (lang: "th-TH" | "en-US") => setLanguage(lang);

	// switchDarkMode
	const switchDarkMode = () => setIsDarkMode(!isDarkMode);

	return (
		<AppContext.Provider
			value={{ language, switchLanguage, isDarkMode, switchDarkMode }}
		>
			{children}
		</AppContext.Provider>
	);
}

export const useLanguage = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within an AppContextProvider");
	}

	const { language, switchLanguage } = context;
	return { language, switchLanguage };
};

export const useSwitchMode = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useSwitchMode must be used within an AppContextProvider");
	}

	const { isDarkMode, switchDarkMode } = context;
	return { isDarkMode, switchDarkMode };
};
