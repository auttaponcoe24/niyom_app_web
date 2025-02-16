"use client";

import ModalConfirm from "@/src/components/admin/zone/ModalConfirm";
import ModalDetail from "@/src/components/admin/zone/ModalDetail";
import TableZone from "@/src/components/admin/zone/TableZone";
import { TMode, TParams } from "@/src/interfaces/zone.interface";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Layout } from "antd";
import React, { useState } from "react";
import { useIntl } from "react-intl";

type Props = {};

export default function ZoneComponent({}: Props) {
	const { messages } = useIntl();
	const [params, setParams] = useState<TParams>({
		pageSize: 10,
		start: 1,
		keywords: "",
	});
	const [zoneId, setZoneId] = useState<number | null>(null);
	const [isMode, setIsMode] = useState<TMode | null>(null);
	const [isFinish, setIsFinish] = useState<boolean>(false);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isOpenModalComfirm, setIsOpenModalComfirm] = useState<boolean>(false);
	const [keywords, setKeywords] = useState<string>("");

	return (
		<Card style={{ marginTop: 14 }}>
			{/* Create */}
			<div className="flex items-center justify-between my-4">
				<div className="flex items-center justify-center gap-2">
					<Input
						placeholder={messages["text.search"] as string}
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
						{messages["text.search"] as string}
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
						{messages["text.reset"] as string}
					</Button>
				</div>
				<button
					className="w-[36px] h-[36px] rounded-full border-none bg-primary cursor-pointer"
					onClick={() => {
						setIsOpenModal(true);
						setIsMode("create");
					}}
				>
					<PlusOutlined style={{ fontSize: 24, color: "white" }} />
				</button>
			</div>

			<Divider />

			{/* table */}
			<TableZone
				params={params}
				setParams={setParams}
				setZoneId={setZoneId}
				setIsOpenModal={setIsOpenModal}
				setIsOpenModalComfirm={setIsOpenModalComfirm}
				setIsMode={setIsMode}
				isFinish={isFinish}
			/>

			<ModalDetail
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				isMode={isMode}
				setIsMode={setIsMode}
				zoneId={zoneId}
				setZoneId={setZoneId}
				isFinish={isFinish}
				setIsFinish={setIsFinish}
			/>

			<ModalConfirm
				zoneId={zoneId}
				setZoneId={setZoneId}
				isOpenModalComfirm={isOpenModalComfirm}
				setIsOpenModalComfirm={setIsOpenModalComfirm}
				isFinish={isFinish}
				setIsFinish={setIsFinish}
			/>
		</Card>
	);
}
