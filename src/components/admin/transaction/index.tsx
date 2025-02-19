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
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "@/utils/dayjs";
import TransactionModal from "@/src/components/admin/transaction/TransactionModal";

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
	const [transactionsData, setTransactionsData] = useState<
		TransactionData[] | null
	>(null);
	const [transactionData, setTransactionData] =
		useState<TransactionData | null>(null);
	const [isCreateCheck, setIsCreateCheck] = useState<boolean>(true);
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

	const tabList: TabsProps["items"] = useMemo(
		() =>
			zoneData?.data.map((zone) => ({
				key: `${zone.id}`,
				label: zone.zoneName,
			})),
		[zoneData]
	);

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
					<div className="absolute top-0 right-0 z-50">
						<Button
							disabled={isCreateCheck}
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
				<TransactionTable
					zoneId={params.zoneId ?? 0}
					params={params}
					setParams={setParams}
					transactionMode={transactionMode}
					setTransactionMode={setTransactionMode}
					setTransactionData={setTransactionData}
					transactionsData={transactionsData}
					setTransactionsData={setTransactionsData}
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
					isFinish={isFinish}
					setIsFinish={setIsFinish}
					setIsCreateCheck={setIsCreateCheck}
				/>
			</Card>

			{/* TransactionModal */}
			<TransactionModal
				transactionMode={transactionMode}
				setTransactionMode={setTransactionMode}
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				setIsFinish={setIsFinish}
				transactionData={transactionData}
				setTransactionData={setTransactionData}
				transactionsData={transactionsData}
				setTransactionsData={setTransactionsData}
				params={params}
			/>
		</div>
	);
}
