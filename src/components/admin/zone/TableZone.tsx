import React, { Dispatch, SetStateAction, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "@/src/store/store";
import { useSelector } from "react-redux";
import { TParams } from "@/src/interfaces/zone.interface";
import { getZoneAll } from "@/src/store/slices/zoneSlice";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
	isFinish: boolean;
};

export default function TableZone({ params, setParams, isFinish }: Props) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data: dataZone, isLoading: isLoadingZone } = useSelector(
		(state: RootState) => state.zoneSlice
	);

	console.log("dataZone=>", dataZone);

	useEffect(() => {
		dispatch(getZoneAll(params));
	}, [params, isFinish, dispatch]);

	const columns: GridColDef<any>[] = [
		{
			field: "no",
			headerName: "ลำดับ",
			width: 100,
			align: "center",
			headerAlign: "center",
			renderCell: ({ row }) => {
				return <div>{row.no}</div>;
			},
		},
		{
			field: "zone_name",
			headerName: "ชื่อ",
			width: 200,
			renderCell: ({ row }) => <div>{row.zone_name}</div>,
		},
		{
			field: "management",
			headerName: "จัดการ",
			headerAlign: "center",
			width: 160,
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
							onClick={() => router.push(`stock/edit?id=${row.id}`)}
						>
							<Edit fontSize="inherit" />
						</IconButton>
						<IconButton
							aria-label="delete"
							size="large"
							onClick={() => {
								// setOpenDialog(true);
								// setSelectedProduct(row);
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
		<Box
			sx={{
				height: 400,
				width: "80%",
				// marginLeft: "auto",
				// marginRight: "auto",
				margin: "auto",
			}}
		>
			<DataGrid
				rows={
					dataZone?.result.map((item: any, index: number) => ({
						...item,
						no: (params.start - 1) * params.page_size + (index + 1),
					})) || []
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
	);
}
