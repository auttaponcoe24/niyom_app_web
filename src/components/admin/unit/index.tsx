"use client";
import SearchUnit from "@/src/components/admin/unit/SearchUnit";
import TableUnit from "@/src/components/admin/unit/TableUnit";
import { TParams } from "@/src/interfaces/unit.interface";
import { Card, Divider } from "antd";
import React, { useState } from "react";

type Props = {};

export default function UnitComponent({}: Props) {
	const [params, setParams] = useState<TParams>({
		start: 1,
		page_size: 30,
		keywords: "",
		month: "",
		year: "",
		type: "W",
		zoneId: 0,
	});

	// console.log("param=>", params);

	return (
		<div>
			{/* Search */}
			<Card>
				<SearchUnit params={params} setParams={setParams} />
			</Card>

			<Divider />

			{/* Table */}
			<Card>
				<TableUnit params={params} setParams={setParams} />
			</Card>
		</div>
	);
}
