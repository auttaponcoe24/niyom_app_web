"use client";
import theme from "@/src/components/ThemeRegistry/theme";
import { ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function ThemeRegistry({ children }: Props) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
