"use client";
import theme from "@/src/components/ThemeRegistry/theme";
import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

type Props = {
	children: ReactNode;
};

export default function ThemeRegistry({ children }: Props) {
	return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
