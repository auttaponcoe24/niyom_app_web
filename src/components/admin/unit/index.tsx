"use client";

import { useGetZone } from "@/src/hooks/useZone";
import {
	UnitData,
	UnitMode,
	UnitParams,
} from "@/src/interfaces/unit.interface";
import { Card, Divider, Tabs, TabsProps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import UnitTable from "@/src/components/admin/unit/UnitTable";
import UnitModalDetail from "@/src/components/admin/unit/UnitModalDetail";
import UnitFilter from "@/src/components/admin/unit/UnitFilter";
import dayjs from "@/utils/dayjs";
type Props = {};

export default function UnitComponent({}: Props) {
	const [params, setParams] = useState<UnitParams>({
		pageSize: 30,
		start: 1,
		zoneId: undefined,
		keywords: "",
		customerId: "",
		date: dayjs().startOf("month").format("YYYY-MM-DD"),
		type: "W",
	});
	const [unitData, setUnitData] = useState<UnitData | null>(null);
	const [unitMode, setUnitMode] = useState<UnitMode>(null);
	const [isFinish, setIsFinish] = useState<boolean>(false);
	const [isModalDetail, setIsModalDetail] = useState<boolean>(false);

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

	const handleOnChangeTabs = (activeKey: string) => {
		if (activeKey) {
			setParams((prev) => ({
				...prev,
				zoneId: +activeKey,
			}));
		}
	};

	// const tabList: TabsProps["items"] = zoneData?.data.map((zone, index) => ({
	// 	key: `${zone.id}`,
	// 	label: zone.zoneName,
	// 	children: (
	// 		<div>
	// 			<UnitTable
	// 				params={params}
	// 				setParams={setParams}
	// 				isFinish={isFinish}
	// 				setUnitData={setUnitData}
	// 				setIsModalDetail={setIsModalDetail}
	// 			/>
	// 		</div>
	// 	),
	// }));

	const tabList: TabsProps["items"] = useMemo(() => {
		return zoneData?.data.map((zone, index) => ({
			key: `${zone.id}`,
			label: zone.zoneName,
		}));
	}, [zoneData]);

	return (
		<div>
			<Card>
				<UnitFilter params={params} setParams={setParams} />
			</Card>

			<Divider />

			<Card>
				{/* Tabs */}
				<Tabs
					defaultActiveKey="30"
					items={tabList}
					onChange={(activeKey: string) => handleOnChangeTabs(activeKey)}
				/>
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
