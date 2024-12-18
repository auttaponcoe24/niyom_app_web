import {
	useGetTransaction,
	useUpdateOrCreateTransaction,
} from "@/src/hooks/useTransaction";
import {
	TGetDataTransaction,
	TParams,
	TUpdateOrCreateTransaction,
} from "@/src/interfaces/transaction.interface";
import {
	Button,
	Input,
	notification,
	Pagination,
	Table,
	TableColumnsType,
} from "antd";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
};

export default function TableTransaction({ params, setParams }: Props) {
	const { messages } = useIntl();
	const [dataTable, setDataTable] = useState<TGetDataTransaction[] | null>(
		null
	);

	console.log("dataTable=>", dataTable);

	const {
		data: dataTransaction,
		isLoading: isLoadingTransaction,
		isFetching: isFetchingTransaction,
		refetch: refetchTransaction,
	} = useGetTransaction(params);

	const {
		mutate: mutateUpdateOrCreateTransaction,
		isPending: isPendingUpdateOrCreateTransaction,
	} = useUpdateOrCreateTransaction();

	useEffect(() => {
		refetchTransaction();
	}, [refetchTransaction, params]);

	useEffect(() => {
		if (dataTransaction && !(dataTransaction instanceof Error)) {
			setDataTable(dataTransaction.data);
		} else {
			console.log(dataTransaction?.message);
		}
	}, [dataTransaction]);

	const columns: TableColumnsType = [
		{
			title: "บ้านเลขที่",
			align: "center",
			width: 80,
			render: (_, record) => {
				return <div className="text-center">{record.houseNumber}</div>;
			},
		},
		{
			title: "ประเภท",
			align: "center",
			width: 80,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record?.type === "W" ? "น้ำ" : "ไฟฟ้า"}
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
			title: "ชื่อ - สกุล",
			align: "left",
			width: 140,
			render: (_, record) => {
				return (
					<div className="text-left">
						{record.prefix} {record.fullname}
					</div>
				);
			},
		},

		{
			title: `หน่วยมิเตอร์ ${
				params.date
					? dayjs(params.date).subtract(1, "month").format("MMMYYYY")
					: ""
			}`,
			align: "center",
			width: 140,
			render: (_, record, index) => {
				return (
					<div className="text-center">
						{dataTable ? dataTable[index]?.unitOld?.unitNumber : ""}
					</div>
				);
			},
		},
		{
			title: `หน่วยมิเตอร์ ${
				params.date ? dayjs(params.date).format("MMMYYYY") : ""
			}`,
			align: "center",
			width: 140,
			render: (_, record, index: number) => {
				return (
					<div className="text-center">
						{dataTable && dataTable[index]?.unitNew.unitNumber}
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
			title: "หน่วยที่ใช้",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.unitUsed}</div>;
			},
		},
		{
			title: "ราคาต่อหน่วย",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.amount}</div>;
			},
		},
		{
			title: "ยอดค้างชำระ",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.overDue}</div>;
			},
		},
		{
			title: "ยอดรวมสุทธิ์",
			align: "center",
			width: 100,
			render: (_, record, index) => {
				return <div>{record?.totalPrice}</div>;
			},
		},
	];

	const handleOnSave = () => {
		if (dataTable) {
			const values: TUpdateOrCreateTransaction[] = [
				...dataTable.map((item, index) => {
					return {
						id: item.id,
						date: item.date,
						month: item.month,
						year: item.year,
						type: item.type === "W" || item.type === "E" ? item.type : "W", // แปลง type ให้ตรง
						unitOldId: item.unitOldId,
						unitNewId: item.unitNewId,
						unitUsed: item.unitUsed,
						amount: item.amount,
						overDue: item.overDue,
						totalPrice: item.totalPrice,
						status: item.status,
						zoneId: item.zoneId,
						customerId: item.customerId,
					};
				}),
			];
			console.log(values);

			// mutateUpdateOrCreateTransaction(values, {
			// 	onSuccess: (success) => {
			// 		if (success) {
			// 			notification.success({
			// 				message: messages["notification.api.resp.success"] as string,
			// 			});
			// 			refetchTransaction();
			// 		} else {
			// 			notification.error({
			// 				message: messages["notification.api.resp.error"] as string,
			// 			});
			// 		}
			// 	},
			// 	onError: (error) => {
			// 		notification.error({
			// 			message: messages["notification.api.resp.error"] as string,
			// 		});
			// 	},
			// });
		}
	};

	return (
		<div>
			<Table
				rowKey={(record) => record.id}
				columns={columns}
				dataSource={dataTable ?? []}
				loading={isLoadingTransaction || isFetchingTransaction}
				pagination={false}
			/>

			<div className="flex flex-col items-end  gap-2 my-4">
				<Button
					type="primary"
					htmlType="button"
					onClick={handleOnSave}
					loading={isPendingUpdateOrCreateTransaction}
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
