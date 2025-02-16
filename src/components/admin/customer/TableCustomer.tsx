import { useGetCustomers } from "@/src/hooks/useCustomer";
import {
	CustomerData,
	CustomerMode,
	CustomerParams,
} from "@/src/interfaces/customer.interface";
import { formatPhoneNumber } from "@/src/utils/formatPhone";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useIntl } from "react-intl";
import { MdOutlineCheck } from "react-icons/md";

type Props = {
	params: CustomerParams;
	setParams: Dispatch<SetStateAction<CustomerParams>>;
	setIsMode: Dispatch<SetStateAction<CustomerMode>>;
	isFinish: boolean;
	setCustomerId: Dispatch<SetStateAction<string | null>>;
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

	const {
		data: customerListData,
		isLoading: isCustomerListLoading,
		isFetching: isCustomerListFetching,
		refetch: refetchCustomerList,
	} = useGetCustomers(params);

	useEffect(() => {
		refetchCustomerList();
	}, [params, isFinish]);

	const columns: ColumnsType<CustomerData> = [
		{
			title: "ลำดับ",
			align: "center",
			width: 40,
			render: (_, record) => {
				return <div className="text-center">{record.no}</div>;
			},
		},
		{
			title: "เขต",
			align: "center",
			width: 100,
			render: (_, record) => {
				return (
					<div>
						{!!record.zone ? (
							<div className="text-left">{record?.zone?.zoneName}</div>
						) : (
							<div className="text-left">-</div>
						)}
					</div>
				);
			},
		},
		{
			title: "ชื่อ - สกุล",
			align: "center",
			width: 140,
			render: (_, record) => {
				return (
					<div className="text-left">
						{`${record?.prefix.prefixName ? record?.prefix.prefixName : ""} ${
							record?.firstName ? record?.firstName : ""
						}  ${record?.lastName ? record?.lastName : ""}`}
					</div>
				);
			},
		},
		// {
		// 	title: "คำนาม",
		// 	align: "center",
		// 	width: 60,
		// 	render: (_, record) => {
		// 		return <div className="text-left">{record?.prefix?.prefixName}</div>;
		// 	},
		// },
		// {
		// 	title: "ชื่อ",
		// 	align: "center",
		// 	width: 150,
		// 	render: (_, record) => {
		// 		return <div className="text-left">{record.firstName}</div>;
		// 	},
		// },
		// {
		// 	title: "นามสกุล",
		// 	align: "center",
		// 	width: 150,
		// 	render: (_, record) => {
		// 		return <div className="text-left">{record.lastName}</div>;
		// 	},
		// },
		{
			title: "ประจำตัวประชาชน",
			align: "center",
			width: 140,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record.cardId ? record.cardId : "-"}
					</div>
				);
			},
		},
		{
			title: "เบอร์โทร",
			align: "center",
			width: 100,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record.phoneNumber ? formatPhoneNumber(record.phoneNumber) : "-"}
					</div>
				);
			},
		},
		{
			title: "เลขที่บ้าน",
			align: "center",
			width: 60,
			render: (_, record) => {
				return (
					<div className="text-center">
						{!!record.houseNumber ? record.houseNumber : "-"}
					</div>
				);
			},
		},
		{
			title: "ที่อยู่",
			align: "center",
			width: 140,
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
			title: "บริการน้ำ",
			align: "center",
			width: 60,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record.isServiceWater ? (
							<div>
								<MdOutlineCheck size={20} />
							</div>
						) : (
							<></>
						)}
					</div>
				);
			},
		},
		{
			title: "บริการไฟฟ้า",
			align: "center",
			width: 60,
			render: (_, record) => {
				return (
					<div className="text-center">
						{record.isServiceElectric ? (
							<div>
								<MdOutlineCheck size={20} />
							</div>
						) : (
							<></>
						)}
					</div>
				);
			},
		},

		{
			title: "จัดการ",
			align: "center",
			width: 60,
			fixed: "right",
			render: (_, record) => {
				return (
					<div className="flex items-center justify-center gap-2">
						<EditOutlined
							style={{ fontSize: 16 }}
							onClick={() => {
								setIsMode("edit");
								setIsOpenModalDetail(true);
								setCustomerId(record.id);
							}}
						/>
						<DeleteOutlined
							style={{ fontSize: 16 }}
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
				size="middle"
				rowKey={(record) => `${record.id}`}
				columns={columns}
				dataSource={
					customerListData?.data?.map((item, index) => ({
						...item,
						idx: (params.start - 1) * params.pageSize + (index + 1),
					})) ?? []
				}
				loading={isCustomerListLoading || isCustomerListFetching}
				pagination={false}
				scroll={{
					x: 1400,
				}}
			/>

			<div className="flex items-center justify-end my-4">
				<Pagination
					showSizeChanger
					current={params.start}
					total={customerListData?.total_record}
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
