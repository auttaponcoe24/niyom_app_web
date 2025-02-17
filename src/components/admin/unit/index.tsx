"use client";

import { useGetZone } from "@/src/hooks/useZone";
import {
	UnitData,
	UnitMode,
	UnitParams,
} from "@/src/interfaces/unit.interface";
import { Card, Divider } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import UnitTable from "@/src/components/admin/unit/UnitTable";
import UnitModalDetail from "@/src/components/admin/unit/UnitModalDetail";

type Props = {};

export default function UnitComponent({}: Props) {
	const [params, setParams] = useState<UnitParams>({
		pageSize: 10,
		start: 1,
		zoneId: undefined,
		keywords: "",
		customerId: "",
		date: moment().startOf("month").format("YYYY-MM-DD"),
		type: "W",
	});
	const [unitData, setUnitData] = useState<UnitData | null>(null);
	const [unitMode, setUnitMode] = useState<UnitMode>(null);
	const [isFinish, setIsFinish] = useState<boolean>(false);
	const [isModalDetail, setIsModalDetail] = useState<boolean>(false);
	const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);

	const { data: zoneData } = useGetZone({
		start: 1,
		pageSize: 99,
		keywords: "",
	});

	useEffect(() => {
		if (zoneData) {
			setParams((prev) => ({
				...prev,
				zoneId: zoneData.data[0].id,
			}));
		}
	}, [zoneData]);
	return (
		<div>
			<Card>Filter</Card>

			<Divider />

			<Card>
				<UnitTable
					params={params}
					setParams={setParams}
					isFinish={isFinish}
					setUnitData={setUnitData}
					setIsModalDetail={setIsModalDetail}
				/>
			</Card>

			{/* ModalDetail */}
			<UnitModalDetail
				isModalDetail={isModalDetail}
				setIsModalDetail={setIsModalDetail}
				unitData={unitData}
				setUnitData={setUnitData}
				unitMode={unitMode}
				setUnitMode={setUnitMode}
				setIsFinish={setIsFinish}
			/>
		</div>
	);
}
