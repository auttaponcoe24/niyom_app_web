import React, { Dispatch, SetStateAction, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, CardHeader, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "@/src/store/store";
import { useSelector } from "react-redux";
import { TMode, TParams } from "@/src/interfaces/zone.interface";
import { getZoneAll } from "@/src/store/slices/zoneSlice";

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
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data: dataZone, isLoading: isLoadingZone } = useSelector(
		(state: RootState) => state.zoneSlice
	);

	// console.log("dataZone=>", dataZone);

	useEffect(() => {
		dispatch(getZoneAll(params));
	}, [params, isFinish, dispatch]);

	const columns: GridColDef<any>[] = [
		{
			flex: 0.1,
			field: "no",
			headerName: "ลำดับ",
			minWidth: 80,
			// align: "center",
			// headerAlign: "center",
			renderCell: ({ row }) => {
				return <div>{row.no}</div>;
			},
		},
		{
			flex: 0.75,
			field: "zone_name",
			headerName: "ชื่อ",
			minWidth: 200,
			renderCell: ({ row }) => <div>{row.zone_name}</div>,
		},
		{
			flex: 0.15,
			field: "management",
			headerName: "จัดการ",
			headerAlign: "center",
			minWidth: 160,
			renderCell: ({ row }) => {
				return (
					<Stack
						direction={"row"}
						spacing={1}
						alignItems="center"
						justifyContent="center"
						width={`100%`}
					>
						<IconButton
							aria-label="edit"
							size="large"
							onClick={() => {
								setZoneId(Number(row.id));
								setIsOpenModal(true);
								setIsMode("edit");
							}}
						>
							<Edit fontSize="inherit" />
						</IconButton>
						<IconButton
							aria-label="delete"
							size="large"
							onClick={() => {
								setIsMode("delete");
								setZoneId(Number(row.id));
								setIsOpenModalComfirm(true);
							}}
						>
							<Delete fontSize="inherit" />
						</IconButton>
					</Stack>
				);
			},
		},
	];
	return (
		<Card elevation={4}>
			{/* <CardHeader title="จัดการเขต" /> */}
			<Box
				sx={{
					minHeight: 300,
					maxHeight: 500,
				}}
			>
				<DataGrid
					rows={
						dataZone?.result?.map((item: any, index: number) => ({
							...item,
							no: (params.start - 1) * params.page_size + (index + 1),
						})) ?? []
					}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: params.page_size, // กำหนดค่า pageSize เริ่มต้น
								page: params.start - 1, // กำหนดค่า page เริ่มต้น
							},
						},
					}}
					pageSizeOptions={[10, 25, 50]} // สามารถเลือกขนาดหน้าที่ต้องการได้
					paginationMode="server" // สำหรับการจัดการ pagination บน server-side
					rowCount={dataZone?.total_record || 0} // กำหนดจำนวนรายการทั้งหมดจาก server
					onPaginationModelChange={(paginationModel) => {
						// อัพเดทสถานะ pagination เมื่อมีการเปลี่ยนแปลง
						setParams((prev) => ({
							...prev,
							page_size: paginationModel.pageSize,
							start: paginationModel.page + 1,
						}));
					}}
					disableRowSelectionOnClick
					loading={isLoadingZone}
				/>
			</Box>
		</Card>
	);
}
