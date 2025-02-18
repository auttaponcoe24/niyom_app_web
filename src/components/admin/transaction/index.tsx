"use client";

import TransactionFilter from "@/src/components/admin/transaction/TransactionFilter";
import TransactionTable from "@/src/components/admin/transaction/TransactionTable";
import { useGetZone } from "@/src/hooks/useZone";
import {
	TransactionData,
	TransactionMode,
	TransactionParams,
} from "@/src/interfaces/transaction.interface";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "@/utils/dayjs";

type Props = {};

export default function TransactionComponent({}: Props) {
	const [transactionMode, setTransactionMode] = useState<TransactionMode>(null);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [params, setParams] = useState<TransactionParams>({
		start: 1,
		pageSize: 30,
		keywords: "",
		customerId: "",
		date: dayjs().startOf("month").format("YYYY-MM-DD"),
		type: "W",
		zoneId: undefined,
	});
	const [transactionData, setTransactionData] =
		useState<TransactionData | null>(null);
	const [isFinish, setIsFinish] = useState<boolean>(false);

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

	const tabList: TabsProps["items"] = zoneData?.data.map((zone, index) => ({
		key: `${zone.id}`,
		label: zone.zoneName,
		children: (
			<div>
				<TransactionTable
					params={params}
					setParams={setParams}
					setTransactionMode={setTransactionMode}
					setTransactionData={setTransactionData}
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
					isFinish={isFinish}
					setIsFinish={setIsFinish}
				/>
			</div>
		),
	}));

	return (
		<div>
			<Card>
				<div className="">
					<TransactionFilter params={params} setParams={setParams} />
				</div>
			</Card>

			<Divider />

			<Card>
				<div className="relative">
					<div className="absolute top-0 right-0">
						<Button
							className="mb-4"
							type="default"
							htmlType="button"
							onClick={() => {
								setIsOpenModal(true);
								setTransactionMode("create");
							}}
						>
							+ ใบงาน
						</Button>
					</div>
					{/* Tabs */}
					<Tabs
						defaultActiveKey="30"
						items={tabList}
						onChange={(activeKey: string) => handleOnChangeTabs(activeKey)}
					/>
				</div>
				{/* table */}
				{/* <TransactionTable
					params={params}
					setParams={setParams}
					setTransactionMode={setTransactionMode}
					setTransactionData={setTransactionData}
					setIsOpenModal={setIsOpenModal}
					isFinish={isFinish}
				/> */}
			</Card>
		</div>
	);
}
