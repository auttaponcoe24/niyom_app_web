"use client";
import React, { ReactNode } from "react";
import th_TH from "../../locales/th-TH.json";
import en_US from "../../locales/en-US.json";
import { IntlProvider } from "react-intl";
import { useLanguage } from "@/src/components/common/AppContextProvider";

type Props = {
	children: ReactNode | any;
};

export default function IntlProviderWrapper({ children }: Props) {
	// กำหนดข้อความแปลภาษา
	const messages: Record<"th-TH" | "en-US", Record<string, string>> = {
		"th-TH": th_TH,
		"en-US": en_US,
	};

	// ใช้ useLanguage เพื่อดึงค่าภาษา
	const { language } = useLanguage();

	return (
		<IntlProvider locale={language} messages={messages[language]}>
			{children}
		</IntlProvider>
	);
}
