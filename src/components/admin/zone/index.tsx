"use client";

import ModalDetail from "@/src/components/admin/zone/ModalDetail";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

type Props = {};

export default function ZoneComponent({}: Props) {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	return (
		<Box>
			{/* Create */}
			<div className="flex items-center justify-between">
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
			<div></div>

			<ModalDetail isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

			<Toaster position="top-right" reverseOrder={false} />
		</Box>
	);
}
