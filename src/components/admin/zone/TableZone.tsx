import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Props = {
	dataZone: any;
};

export default function TableZone({ dataZone }: Props) {
	const router = useRouter();
	const columns: GridColDef<any>[] = [
		{
			field: "no",
			headerName: "ลำดับ",
			width: 100,
			align: "center",
			headerAlign: "center",
			renderCell: ({ row }) => <div>{row.id}</div>,
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
		<Box sx={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={dataZone?.result || []}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				pageSizeOptions={[10]}
				// checkboxSelection
				disableRowSelectionOnClick
			/>
		</Box>
	);
}
