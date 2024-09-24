"use client";
import React from "react";
import { useIntl } from "react-intl";

type Props = {};

export default function MainPage({}: Props) {
	const { messages } = useIntl();
	return <div>{messages["text1"] as string}</div>;
}
