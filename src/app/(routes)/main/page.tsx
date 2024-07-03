"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

type Props = {};

export default function MainPage({}: Props) {
	return (
		<Box className="!border !border-red-500">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={["DateCalendar", "DateCalendar"]}>
					<DemoItem>
						<DateCalendar defaultValue={dayjs()} readOnly={true} />
					</DemoItem>
				</DemoContainer>
			</LocalizationProvider>
		</Box>
	);
}
