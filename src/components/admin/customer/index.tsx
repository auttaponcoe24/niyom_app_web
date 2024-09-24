"use client";

import ModalDetail from "@/src/components/admin/customer/ModalDetail";
import TableCustomer from "@/src/components/admin/customer/TableCustomer";
import { TMode, TParams } from "@/src/interfaces/customer.interface";
import React, { useState } from "react";
import ModalConfirm from "@/src/components/admin/customer/ModalConfirm";
import { Button, Card, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type Props = {};

export default function CustomerComponent({}: Props) {
	const [params, setParams] = useState<TParams>({
		page_size: 10,
		start: 1,
		keywords: "",
	});
	const [customerId, setCustomerId] = useState<number | null>(null);
	const [isMode, setIsMode] = useState<TMode>(null);
	const [isFinish, setIsFinish] = useState<boolean>(false);
	const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
	const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
	const [keywords, setKeywords] = useState<string>("");

	return (
		<Card style={{ marginTop: 14 }}>
			{/* Create */}
			<div className="flex items-center justify-between my-4">
				<div className="flex items-center justify-center gap-2">
					<Input
						variant="outlined"
						placeholder="ค้นหา"
						size="middle"
						value={keywords}
						onChange={(e) => setKeywords(e.target.value)}
					/>
					<Button
						type="primary"
						onClick={() =>
							setParams((prev) => ({
								...prev,
								keywords: keywords,
							}))
						}
					>
						ค้นหา
					</Button>
					<Button
						type="default"
						onClick={() => {
							setParams((prev) => ({
								...prev,
								keywords: "",
							}));
							setKeywords("");
						}}
					>
						ล้าง
					</Button>
				</div>
				<button
					className="w-[36px] h-[36px] rounded-full border-none bg-primary cursor-pointer"
					onClick={() => {
						setIsOpenModalDetail(true);
						setIsMode("create");
					}}
				>
					<PlusOutlined style={{ fontSize: 24, color: "white" }} />
				</button>
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
	);
}
