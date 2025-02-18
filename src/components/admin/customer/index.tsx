"use client";

import ModalDetail from "@/src/components/admin/customer/ModalDetail";
import TableCustomer from "@/src/components/admin/customer/TableCustomer";
import {
	CustomerMode,
	CustomerParams,
} from "@/src/interfaces/customer.interface";
import React, { useState } from "react";
import ModalConfirm from "@/src/components/admin/customer/ModalConfirm";
import { Button, Card, Divider, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomerFilter from "@/src/components/admin/customer/CustomerFilter";

type Props = {};

export default function CustomerComponent({}: Props) {
	const [params, setParams] = useState<CustomerParams>({
		pageSize: 10,
		start: 1,
		zoneId: 0,
		keywords: "",
	});
	const [customerId, setCustomerId] = useState<string | null>(null);
	const [isMode, setIsMode] = useState<CustomerMode>(null);
	const [isFinish, setIsFinish] = useState<boolean>(false);
	const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
	const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);

	return (
		<div>
			<Card>
				<div className="">
					<CustomerFilter params={params} setParams={setParams} />
				</div>
			</Card>

			<Divider />

			<Card>
				<div className="flex items-center justify-end">
					<Button
						className="mb-4"
						type="default"
						htmlType="button"
						onClick={() => {
							setIsOpenModalDetail(true);
							setIsMode("create");
						}}
					>
						+ ลูกค้า
					</Button>
				</div>
				{/* table */}
				<TableCustomer
					params={params}
					setParams={setParams}
					setCustomerId={setCustomerId}
					setIsOpenModalDetail={setIsOpenModalDetail}
					setIsOpenModalConfirm={setIsOpenModalConfirm}
					setIsMode={setIsMode}
					isFinish={isFinish}
				/>

				<ModalDetail
					isModalOpen={isOpenModalDetail}
					setIsModalOpen={setIsOpenModalDetail}
					isMode={isMode}
					setIsMode={setIsMode}
					customerId={customerId}
					setCustomerId={setCustomerId}
					isFinish={isFinish}
					setIsFinish={setIsFinish}
				/>

				<ModalConfirm
					isOpenModal={isOpenModalConfirm}
					setIsOpenModal={setIsOpenModalConfirm}
					customerId={customerId}
					isFinish={isFinish}
					setIsFinish={setIsFinish}
				/>
			</Card>
		</div>
	);
}
