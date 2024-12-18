import { useGetUnit, useUpdateOrCreateUnit } from "@/src/hooks/useUnit";
import { TParams } from "@/src/interfaces/unit.interface";
import { EditOutlined } from "@ant-design/icons";
import {
	Button,
	Input,
	notification,
	Pagination,
	Table,
	TableColumnsType,
} from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
};

export default function TableUnit({ params, setParams }: Props) {
	const { messages } = useIntl();
	const [dataTable, setDataTable] = useState<any[]>([]);
	// console.log("dataTable=>", dataTable);

	const {
		data: dataUnit,
		isLoading: isLoadingUnit,
		isFetching: isFetchingUnit,
		refetch: refetchUnit,
	} = useGetUnit(params);

	const {
		mutate: mutateUpdateOrCreateUnit,
		isPending: isPendingUpdateOrCreateUnit,
	} = useUpdateOrCreateUnit();

	useEffect(() => {
		refetchUnit();
	}, [refetchUnit, params]);

	useEffect(() => {
		if (dataUnit) {
			setDataTable([...dataUnit.result]);
		} else {
			setDataTable([]);
		}
	}, [dataUnit]);

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
						{record.units[0].type === "W" ? "น้ำ" : "ไฟฟ้า"}
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
						<Input
							style={{ textAlign: "center" }}
							// disabled={dataTable[index].units[0].id != 0}
							value={dataTable[index].units[0].unit_number}
							onChange={(e) =>
								setDataTable((prev) => {
									const updated = prev.map((item, idx: number) =>
										idx === index
											? {
													...item,
													units: item.units.map((unit: any, unitIdx: number) =>
														unitIdx === 0
															? { ...unit, unit_number: e.target.value }
															: unit
													),
											  }
											: item
									);
									return updated;
								})
							}
						/>
					</div>
				);
			},
		},
		// {
		// 	title: "จัดการ",
		// 	align: "center",
		// 	width: 100,
		// 	render: (_, record, index) => {
		// 		return (
		// 			<div>
		// 				<Button
		// 					type="text"
		// 					icon={<EditOutlined style={{ fontSize: 14 }} />}
		// 					disabled={dataTable[index].units[0].id == 0}
		// 					onClick={() => {}}
		// 				></Button>
		// 			</div>
		// 		);
		// 	},
		// },
	];

	const handleOnSave = () => {
		const data = [
			...dataTable.map((item) => ({
				// units: item.units[0],
				id: item.units[0].id,
				month: item.units[0].month,
				year: item.units[0].year,
				unit_number: item.units[0].unit_number,
				type: item.units[0].type,
				customerId: item.units[0].customerId,
			})),
		];
		// console.log("data=>", data);

		mutateUpdateOrCreateUnit(data, {
			onSuccess: (data) => {
				if (!!data) {
					notification.success({
						message: messages["notification.api.resp.success"] as string,
					});
					refetchUnit();
				} else {
					notification.error({
						message: messages["notification.api.resp.error"] as string,
					});
				}
			},
			onError: () => {
				notification.error({
					message: messages["notification.api.resp.error"] as string,
				});
			},
		});
	};
	return (
		<div>
			{/* <div className="flex mx-auto items-center justify-center"> */}
			<Table
				// style={{
				// 	maxWidth: 720,
				// }}
				rowKey={(record) => record.id}
				columns={columns}
				dataSource={dataTable}
				loading={isLoadingUnit || isFetchingUnit}
				pagination={false}
			/>
			{/* </div> */}

			<div className="flex flex-col items-end  gap-2 my-4">
				<Button
					type="primary"
					htmlType="button"
					onClick={handleOnSave}
					loading={isPendingUpdateOrCreateUnit}
				>
					{messages["text.save"] as string}
				</Button>
				<Pagination
					showSizeChanger
					current={params.start}
					total={dataUnit?.total_record}
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
