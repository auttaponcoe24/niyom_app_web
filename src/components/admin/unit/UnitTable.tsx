import { useGetUnitList } from "@/src/hooks/useUnit";
import { UnitData, UnitParams } from "@/src/interfaces/unit.interface";
import { EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import { useIntl } from "react-intl";

type Props = {
	params: UnitParams;
	setParams: Dispatch<SetStateAction<UnitParams>>;
	isFinish: boolean;
	setUnitData: Dispatch<SetStateAction<UnitData | null>>;
	setIsModalDetail: Dispatch<SetStateAction<boolean>>;
};

export default function UnitTable({
	params,
	setParams,
	isFinish,
	setUnitData,
	setIsModalDetail,
}: Props) {
	const { messages } = useIntl();

	const {
		data: unitListData,
		isLoading: isUnitListLoading,
		isFetching: isUnitListFetching,
		refetch: refetchUnitList,
	} = useGetUnitList(params);

	useEffect(() => {
		refetchUnitList();
	}, [params, isFinish]);

	const columns: ColumnsType<UnitData> = [
		{
			title: "ลำดับ",
			align: "center",
			render: (_, record) => {
				return <div className="text-center">{record.no}</div>;
			},
		},
		{
			title: "ชื่อ - สกุล",
			align: "center",
			render: (_, record) => {
				return <div className="text-left">{record.fullName}</div>;
			},
		},
		{
			title: dayjs.utc(params.date).format("MMMBB") as string,
			align: "center",
			render: (_, record) => {
				return (
					<div>
						{record.id === 0 ? (
							<div className="text-red-600">ยังไม่จดหน่วย</div>
						) : (
							record.unitNumber
						)}
					</div>
				);
			},
		},
		{
			title: "จัดการ",
			align: "center",
			render: (_, record) => {
				return (
					<div>
						{/* <button
							onClick={() => {
								setUnitData(record);
							}}
						> */}
						<EditOutlined
							style={{ fontSize: 18 }}
							onClick={() => {
								setUnitData(record);
								setIsModalDetail(true);
							}}
						/>
						{/* </button> */}
					</div>
				);
			},
		},
	];
	return (
		<div>
			<Table
				size="middle"
				rowKey={(record) => `${record.no} ${record.customerId}`}
				columns={columns}
				dataSource={unitListData?.data}
				loading={isUnitListLoading || isUnitListFetching}
				pagination={false}
			/>

			<div className="flex items-center justify-end my-4">
				<Pagination
					showSizeChanger
					current={params.start}
					total={unitListData?.total_record}
					defaultPageSize={30}
					pageSizeOptions={[10, 30, 50, 500, 1000]}
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
		</div>
	);
}
