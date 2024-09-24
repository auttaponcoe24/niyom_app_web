import { TMode, TParams } from "@/src/interfaces/customer.interface";
import { getCustomerAll } from "@/src/store/slices/customerSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { formatPhoneNumber } from "@/src/utils/formatPhone";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Pagination, Table, TableColumnsType } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
	setIsMode: Dispatch<SetStateAction<TMode>>;
	isFinish: boolean;
	setCustomerId: Dispatch<SetStateAction<number | null>>;
	setIsOpenModalDetail: Dispatch<SetStateAction<boolean>>;
	setIsOpenModalConfirm: Dispatch<SetStateAction<boolean>>;
};

export default function TableCustomer({
	params,
	setParams,
	setIsMode,
	isFinish,
	setCustomerId,
	setIsOpenModalDetail,
	setIsOpenModalConfirm,
}: Props) {
	const { messages } = useIntl();
	const dispatch = useAppDispatch();
	const { data: dataCustomer, isLoading: isLoadingCustomer } = useSelector(
		(state: RootState) => state.customerSlice
	);
	// console.log("dataCustomer=>", dataCustomer, isLoadingCustomer);

	useEffect(() => {
		dispatch(getCustomerAll(params));
	}, [params, isFinish, dispatch]);

	const columns: TableColumnsType = [
		{
			title: "ลำดับ",
			align: "center",
			width: 80,
			render: (_, record) => {
				return <div className="text-center">{record.no}</div>;
			},
		},
		{
			title: "คำนาม",
			align: "center",
			width: 100,
			render: (_, record) => {
				return <div className="text-left">{record?.prefix?.prefix_name}</div>;
			},
		},
		{
			title: "ชื่อ",
			align: "center",
			width: 150,
			render: (_, record) => {
				return <div className="text-left">{record.firstname}</div>;
			},
		},
		{
			title: "นามสกุล",
			align: "center",
			width: 150,
			render: (_, record) => {
				return <div className="text-left">{record.lastname}</div>;
			},
		},
		{
			title: "รหัสประจำตัวประชาชน",
			align: "center",
			width: 200,
			render: (_, record) => {
				return (
					<div className="text-center">
						{!!record.card_id ? record.card_id : "-"}
					</div>
				);
			},
		},
		{
			title: "เบอร์โทร",
			align: "center",
			width: 150,
			render: (_, record) => {
				return (
					<div className="text-center">
						{!!record.phone ? formatPhoneNumber(record.phone) : "-"}
					</div>
				);
			},
		},
		{
			title: "เลขที่บ้าน",
			align: "center",
			width: 140,
			render: (_, record) => {
				return (
					<div className="text-center">
						{!!record.house_number ? record.house_number : "-"}
					</div>
				);
			},
		},
		{
			title: "ที่อยู่",
			align: "center",
			width: 200,
			render: (_, record) => {
				return (
					<div>
						{!!record.address ? (
							<div className="text-left">{record.address}</div>
						) : (
							<div className="text-center">-</div>
						)}
					</div>
				);
			},
		},
		{
			title: "เขต",
			align: "center",
			width: 200,
			render: (_, record) => {
				return (
					<div>
						{!!record.zone ? (
							<div className="text-left">{record?.zone?.zone_name}</div>
						) : (
							<div className="text-center">-</div>
						)}
					</div>
				);
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
							style={{ fontSize: 20 }}
							onClick={() => {
								setIsMode("edit");
								setIsOpenModalDetail(true);
								setCustomerId(record.id);
							}}
						/>
						<DeleteOutlined
							style={{ fontSize: 20 }}
							onClick={() => {
								setIsMode("delete");
								setIsOpenModalConfirm(true);
								setCustomerId(record.id);
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
				rowKey={(record) => `${record.no}`}
				columns={columns}
				dataSource={
					dataCustomer?.result?.map((item: any, index: number) => ({
						...item,
						no: (params.start - 1) * params.page_size + (index + 1),
					})) ?? []
				}
				loading={isLoadingCustomer}
				pagination={false}
				scroll={{
					x: 1400,
				}}
			/>

			<div className="flex items-center justify-end my-4">
				<Pagination
					showSizeChanger
					current={params.start}
					total={dataCustomer?.total_record}
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
