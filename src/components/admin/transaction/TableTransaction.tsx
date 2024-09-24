import { useGetTransaction } from "@/src/hooks/useTransaction";
import { TParams } from "@/src/interfaces/transaction.interface";
import { Button, Input, Pagination, Table, TableColumnsType } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
};

export default function TableTransaction({ params, setParams }: Props) {
	const { messages } = useIntl();
	const [dataTable, setDataTable] = useState<any[]>([]);

	console.log("dataTable=>", dataTable);

	const {
		data: dataTransaction,
		isLoading: isLoadingTransaction,
		isFetching: isFetchingTransaction,
		refetch: refetchTransaction,
	} = useGetTransaction(params);

	useEffect(() => {
		refetchTransaction();
	}, [params]);

	useEffect(() => {
		if (dataTransaction) {
			setDataTable(dataTransaction.customers);
		}
	}, [dataTransaction]);

	const columns: TableColumnsType = [
		{
			title: "บ้านเลขที่",
			align: "center",
			width: 80,
			render: (_, record) => {
				return <div className="text-center">{record.house_number}</div>;
			},
		},
		{
			title: "ประเภท",
			align: "center",
			width: 80,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record?.transactions[0]?.type === "W" ? "น้ำ" : "ไฟฟ้า"}
					</div>
				);
			},
		},
		{
			title: "คำนาม",
			align: "left",
			width: 80,
			render: (_, record) => {
				return <div className="text-left">{record.prefix.prefix_name}</div>;
			},
		},
		{
			title: "ชื่อ",
			align: "left",
			width: 140,
			render: (_, record) => {
				return <div className="text-left">{record.firstname}</div>;
			},
		},
		{
			title: "นามสกุล",
			align: "left",
			width: 140,
			render: (_, record) => {
				return <div className="text-left">{record.lastname}</div>;
			},
		},
		{
			title: `หน่วยมิเตอร์ ${
				!!params.month ? `${params.month}/${params.year}` : ""
			}`,
			align: "center",
			width: 140,
			render: (_, record, index: number) => {
				return (
					<div className="text-center">
						{dataTable[index]?.transactions[0]?.unit_new?.unit_number}
						{/* <Input
							style={{ textAlign: "center" }}
							value={dataTable[index].transactions[0].unit_new.unit_number}
							onChange={(e) =>
								setDataTable((prev) => {
									const updated = prev.map((item, idx: number) =>
										idx === index
											? {
													...item,
													units: item.transactions.map(
														(unit: any, transactionIdx: number) =>
															transactionIdx === 0
																? { ...unit, unit_number: e.target.value }
																: unit
													),
											  }
											: item
									);
									return updated;
								})
							}
						/> */}
					</div>
				);
			},
		},
		{
			title: `หน่วยมิเตอร์ ${
				!!params.month
					? `${Number(params.month) === 1 ? "12" : Number(params.month) - 1}/${
							Number(params.month) === 1 ? Number(params.year) - 1 : params.year
					  }`
					: ""
			}`,
			align: "center",
			width: 140,
			render: (_, record, index) => {
				return (
					<div className="text-center">
						{dataTable[index]?.transactions[0]?.unit_old?.unit_number}
					</div>
				);
			},
		},
		{
			title: "หน่วยที่ใช้",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.transactions[0]?.unit_used}</div>;
			},
		},
		{
			title: "ราคาต่อหน่วย",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.transactions[0]?.amount}</div>;
			},
		},
		{
			title: "ยอดค้างชำระ",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.transactions[0]?.over_due}</div>;
			},
		},
		{
			title: "ยอดรวมสุทธิ์",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.transactions[0]?.total_price}</div>;
			},
		},
	];

	const handleOnSave = () => {};

	return (
		<div>
			<Table
				rowKey={(record) => record.id}
				columns={columns}
				dataSource={dataTable}
				loading={isLoadingTransaction || isFetchingTransaction}
				pagination={false}
			/>

			<div className="flex flex-col items-end  gap-2 my-4">
				<Button
					type="primary"
					htmlType="button"
					onClick={handleOnSave}
					// loading={isPendingUpdateOrCreateUnit}
				>
					{messages["text.save"] as string}
				</Button>
				<Pagination
					showSizeChanger
					current={params.start}
					// total={dataUnit?.total_record}
					pageSize={params.page_size} // กำหนด pageSize เอง
					pageSizeOptions={["10", "20", "30", "50", "100"]} // กำหนดตัวเลือก pageSize
					showTotal={(total) =>
						`${messages["pagination.total"] as string} ${total} ${
							messages["pagination.item"] as string
						}`
					}
					onChange={(page: number, pageSize: number) => {
						setParams((prev) => ({
							...prev,
							start: page,
							page_size: pageSize,
						}));
					}}
					responsive
				/>
			</div>
		</div>
	);
}
