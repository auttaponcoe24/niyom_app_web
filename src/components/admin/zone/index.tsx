"use client";

import ModalDetail from "@/src/components/admin/zone/ModalDetail";
import TableZone from "@/src/components/admin/zone/TableZone";
import { useGetZone } from "@/src/hooks/useZone";
import { TParams } from "@/src/interfaces/zone.interface";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

type Props = {};

export default function ZoneComponent({}: Props) {
	const [params, setParams] = useState<TParams>({
		page_size: 10,
		start: 1,
		keywords: "",
	});
	const [isFinish, setIsFinish] = useState<boolean>(false);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	// const {
	// 	data: dataZone,
	// 	isLoading: isLoadingZone,
	// 	isFetching: isFetching,
	// 	refetch: refetchZone,
	// } = useGetZone();
	// console.log("dataZone=>", dataZone);

	return (
		<Box>
			{/* Create */}
			<div className="flex items-center justify-between my-4">
				<div></div>
				<Button
					type="button"
					variant="contained"
					color="primary"
					onClick={() => setIsOpenModal(true)}
				>
					+ สร้างเขต
				</Button>
			</div>

			{/* table */}
			<TableZone params={params} setParams={setParams} isFinish={isFinish} />

			<ModalDetail
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				isFinish={isFinish}
				setIsFinish={setIsFinish}
			/>

			<Toaster position="top-right" reverseOrder={false} />
		</Box>
	);
}
