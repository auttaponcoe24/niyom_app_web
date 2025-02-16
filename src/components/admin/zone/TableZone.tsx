import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TMode, TParams, ZoneData } from "@/src/interfaces/zone.interface";
import { Button, Card, Pagination, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { useGetZone } from "@/src/hooks/useZone";
import { ColumnsType } from "antd/es/table";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
	isFinish: boolean;
	setZoneId: Dispatch<SetStateAction<number | null>>;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	setIsOpenModalComfirm: Dispatch<SetStateAction<boolean>>;
	setIsMode: Dispatch<SetStateAction<TMode | null>>;
};

export default function TableZone({
	params,
	setParams,
	isFinish,
	setZoneId,
	setIsOpenModal,
	setIsOpenModalComfirm,
	setIsMode,
}: Props) {
	const { messages } = useIntl();
	const router = useRouter();

	// console.log("dataZone=>", dataZone);
	const {
		data: zoneData,
		isLoading: isLoadingZone,
		isFetching: isFetchingZone,
		refetch: refetchZone,
	} = useGetZone(params);

	useEffect(() => {
		refetchZone();
	}, [params, isFinish]);

	const columns: ColumnsType<ZoneData> = [
		{
			title: "ลำดับ",
			align: "center",
			width: 60,
			render: (_, record) => {
				return <div className="text-center">{record.no}</div>;
			},
		},

		{
			title: "ชื่อ",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-left">{record.zoneName}</div>;
			},
		},
		{
			title: "จัดการ",
			align: "center",
			width: 80,
			render: (_, record) => {
				return (
					<div className="flex items-center justify-center gap-2">
						<EditOutlined
							style={{ fontSize: 18 }}
							onClick={() => {
								setZoneId(Number(record.id));
								setIsOpenModal(true);
								setIsMode("edit");
							}}
						/>

						<DeleteOutlined
							style={{ fontSize: 18 }}
							onClick={() => {
								setIsMode("delete");
								setZoneId(Number(record.id));
								setIsOpenModalComfirm(true);
							}}
						/>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Table
				rowKey={(record) => record.no}
				columns={columns}
				dataSource={
					zoneData?.data?.map((item: any, index: number) => ({
						...item,
						no: (params.start - 1) * params.pageSize + (index + 1),
					})) ?? []
				}
				scroll={{
					x: 300,
				}}
				loading={isLoadingZone || isFetchingZone}
				pagination={false}
			/>

			<div className="flex items-center justify-end my-4">
				<Pagination
					showSizeChanger
					current={params.start}
					total={zoneData?.total_record}
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
