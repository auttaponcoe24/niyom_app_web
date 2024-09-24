"use client";

import SearchTrasaction from "@/src/components/admin/transaction/SearchTrasaction";
import TableTransaction from "@/src/components/admin/transaction/TableTransaction";
import { TParams } from "@/src/interfaces/transaction.interface";
import { Card, Divider } from "antd";
import React, { useState } from "react";

type Props = {};

export default function Transaction({}: Props) {
	const [params, setParams] = useState<TParams>({
		start: 1,
		page_size: 30,
		keywords: "",
		month: "",
		year: "",
		type: "W",
		zoneId: 0,
	});

	return (
		<div>
			{/* Search */}
			<Card>
				<SearchTrasaction params={params} setParams={setParams} />
			</Card>

			<Divider />

			<Card>
				<TableTransaction params={params} setParams={setParams} />
			</Card>
		</div>
	);
}
