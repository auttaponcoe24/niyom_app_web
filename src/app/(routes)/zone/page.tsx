import ZoneComponent from "@/src/components/admin/zone";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Zone({}: Props) {
	return (
		<Box>
			<header className="tw-mb-5">
				<Breadcrumbs aria-label="breadcrumb">
					<Link className="no-underline" color="inherit" href="/main">
						หน้าหลัก
					</Link>

					<Typography color="text.primary">จัดการเขต</Typography>
				</Breadcrumbs>
			</header>

			<section className="w-full px-6 py-2 min-h-[calc(100vh-250px)]">
				<ZoneComponent />
			</section>
		</Box>
	);
}
