"use client";

import ModalConfirm from "@/src/components/admin/zone/ModalConfirm";
import ModalDetail from "@/src/components/admin/zone/ModalDetail";
import TableZone from "@/src/components/admin/zone/TableZone";
import { TMode, TParams } from "@/src/interfaces/zone.interface";
import { Box, Button, Card, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

type Props = {};

export default function ZoneComponent({}: Props) {
	const [params, setParams] = useState<TParams>({
		page_size: 10,
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
		<Box
			sx={{
				margin: 4,
			}}
		>
			{/* Create */}
			<div className="flex items-center justify-between my-4">
				<div className="flex items-center justify-center gap-2">
					<TextField
						variant="outlined"
						label="ค้นหา"
						size="small"
						value={keywords}
						onChange={(e) => setKeywords(e.target.value)}
					/>
					<Button
						variant="contained"
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
						variant="outlined"
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
				<Button
					type="button"
					variant="outlined"
					// color="primary"
					onClick={() => {
						setIsOpenModal(true);
						setIsMode("create");
					}}
				>
					+ สร้างเขต
				</Button>
			</div>

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

			<Toaster position="top-right" reverseOrder={false} />
		</Box>
	);
}
