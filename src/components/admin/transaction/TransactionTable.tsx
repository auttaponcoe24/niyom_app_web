import { useGetTransactions } from "@/src/hooks/useTransaction";
import {
	TransactionData,
	TransactionMode,
	TransactionParams,
} from "@/src/interfaces/transaction.interface";
import { EditOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import dayjs from "@/utils/dayjs";
import UnitModalDetail from "@/src/components/admin/unit/UnitModalDetail";
import { UnitData, UnitMode } from "@/src/interfaces/unit.interface";
import { AiOutlineEdit } from "react-icons/ai";

type Props = {
	params: TransactionParams;
	setParams: Dispatch<SetStateAction<TransactionParams>>;
	setTransactionMode: Dispatch<SetStateAction<TransactionMode>>;
	setTransactionData: Dispatch<SetStateAction<TransactionData | null>>;
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	isFinish: boolean;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

export default function TransactionTable({
	params,
	setParams,
	setTransactionMode,
	setTransactionData,
	isOpenModal,
	setIsOpenModal,
	isFinish,
	setIsFinish,
}: Props) {
	const { messages } = useIntl();
	const [unitData, setUnitData] = useState<UnitData | null>(null);
	const [unitMode, setUnitMode] = useState<UnitMode | null>(null);
	const {
		data: transactionListData,
		isLoading: isTransactionListLoading,
		isFetching: isTransactionListFetching,
		refetch: refetchTransactionList,
	} = useGetTransactions(params);

	useEffect(() => {
		refetchTransactionList();
	}, [params, isFinish]);
	const columns: ColumnsType<TransactionData> = [
		{
			title: "ลำดับ",
			align: "center",
			fixed: "left",
			width: 60,
			render: (_, record) => {
				return <div className="text-center">{record.no}</div>;
			},
		},
		{
			title: "ชื่อ - สกุล",
			align: "center",
			fixed: "left",
			width: 200,
			render: (_, record) => {
				return <div className="text-left">{record.fullName}</div>;
			},
		},
		{
			// หน่วยใหม่
			title: dayjs.utc(params.date).startOf("month").format("MMMBB"),
			align: "center",
			width: 140,
			render: (_, record) => {
				return (
					<div className="flex items-center justify-between gap-4">
						{!record?.unitNewId ? (
							<div className="text-red-600">ยังไม่จดหน่วย</div>
						) : (
							record?.unitNew?.unitNumber
						)}

						<EditOutlined
							style={{ fontSize: 16 }}
							className={
								!record.unitOld.id
									? "text-gray-300 !cursor-not-allowed"
									: "cursor-pointer"
							}
							onClick={() => {
								setUnitData({
									id: record.unitNew.id,
									date: record.unitNew.date,
									type: record.type,
									unitNumber: record.unitNew.unitNumber,
									customerId: record.customerId,
									zoneId: record.zoneId,
									no: record.no,
									prefix: record.prefix,
									fullName: record.fullName,
									houseNumber: record.houseNumber,
								});
								if (!!record.unitOld.id) {
									setIsOpenModal(true);
								}
							}}
						/>
					</div>
				);
			},
		},
		{
			// หน่วยเดือนที่แล้ว
			title: dayjs
				.utc(params.date, "YYYY-MM-DD")
				.subtract(1, "month")
				.startOf("month")
				.format("MMMBB"),
			align: "center",
			width: 140,
			render: (_, record) => {
				return (
					<div className="flex items-center justify-between gap-4">
						{!record?.unitOldId ? (
							<div className="text-red-600">ยังไม่จดหน่วย</div>
						) : (
							record?.unitOld?.unitNumber
						)}
						<EditOutlined
							style={{ fontSize: 16 }}
							onClick={() => {
								setUnitData({
									id: record.unitOld.id,
									date: record.unitOld.date,
									type: record.type,
									unitNumber: record.unitOld.unitNumber,
									customerId: record.customerId,
									zoneId: record.zoneId,
									no: record.no,
									prefix: record.prefix,
									fullName: record.fullName,
									houseNumber: record.houseNumber,
								});
								console.log(record);

								setIsOpenModal(true);
							}}
						/>
					</div>
				);
			},
		},
		{
			title: "หน่วยที่ใช้",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-center">{record.unitUsed}</div>;
			},
		},
		{
			title: "ราคา/หน่วย",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-center">{record.amount}</div>;
			},
		},
		{
			title: "ยอดค้าง",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-center">{record.overDue}</div>;
			},
		},
		{
			title: "รวมสุทธิ์",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-center">{record.total}</div>;
			},
		},
		{
			title: "ชำระ",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-center">{record.pay}</div>;
			},
		},
		{
			title: "คงเหลือ",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-center">{record.remain}</div>;
			},
		},
		{
			title: "ผู้รับเงิน",
			align: "center",
			width: 120,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record.approved ? (
							<div>
								<div>{record?.approved?.firstName}</div>
							</div>
						) : (
							"-"
						)}
					</div>
				);
			},
		},
		{
			title: "วันที่รับ",
			align: "center",
			width: 120,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record.approved ? (
							<div>
								<div>{dayjs.utc(record.approvedAt).format("DDMMMBB")}</div>
							</div>
						) : (
							"-"
						)}
					</div>
				);
			},
		},
		{
			title: "สถานะ",
			align: "center",
			width: 100,
			render: (_, record) => {
				return (
					<div>
						{record.status === "WAINING" ? (
							<div
								className={`text-center py-1 px-2 rounded-full text-yellow-600 bg-yellow-100`}
							>
								{`รอจ่าย` as string}
							</div>
						) : (
							<div
								className={`text-center py-1 px-2 rounded-full text-blue-600 bg-blue-100`}
							>
								{`จ่ายแล้ว` as string}
							</div>
						)}
					</div>
				);
			},
		},
	];
	return (
		<div>
			<Table
				size="middle"
				rowKey={(record) => `${record.customerId}`}
				columns={columns}
				bordered
				dataSource={
					transactionListData?.data?.map((item, index) => ({
						...item,
						// idx: (params.start - 1) * params.pageSize + (index + 1),
					})) ?? []
				}
				loading={isTransactionListLoading || isTransactionListFetching}
				pagination={false}
				scroll={{
					x: 1200,
				}}
			/>

			<div className="flex items-center justify-end my-4">
				<Pagination
					showSizeChanger
					current={params.start}
					total={transactionListData?.total_record}
					pageSizeOptions={[10, 30, 50, 100, 1000]}
					defaultPageSize={30}
					showTotal={(total) =>
						`${messages["pagination.total"] as string} ${total} ${
							messages["pagination.item"] as string
						}`
					}
					onChange={(page: number, pageSize: number) => {
						setParams((prev) => ({
							...prev,
							start: page,
							pageSize: pageSize,
						}));
					}}
					responsive
				/>
			</div>

			{/* ModalDetail */}
			<UnitModalDetail
				isModalDetail={isOpenModal}
				setIsModalDetail={setIsOpenModal}
				unitData={unitData}
				setUnitData={setUnitData}
				unitMode={unitMode}
				setUnitMode={setUnitMode}
				setIsFinish={setIsFinish}
			/>
		</div>
	);
}
