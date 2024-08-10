"use client";

import { store } from "@/src/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type Props = {
	children: ReactNode;
};

export default function ReduxProvider({ children }: Props) {
	return <Provider store={store}>{children}</Provider>;
}
