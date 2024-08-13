import { deleteZone } from "@/src/store/slices/zoneSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogTitle,
	Divider,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
	zoneId: number | null;
	setZoneId: React.Dispatch<React.SetStateAction<number | null>>;
	isOpenModalComfirm: boolean;
	setIsOpenModalComfirm: Dispatch<SetStateAction<boolean>>;
	isFinish: boolean;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

export default function ModalConfirm({
	zoneId,
	setZoneId,
	isOpenModalComfirm,
	setIsOpenModalComfirm,
	isFinish,
	setIsFinish,
}: Props) {
	const { isFetchingDeleteZone } = useSelector(
		(state: RootState) => state.zoneSlice
	);

	const dispatch = useAppDispatch();
	const handleOnClose = () => {
		setIsOpenModalComfirm(false);
		setZoneId(null);
	};

	const handleOnConfirm = async () => {
		const res = await dispatch(deleteZone(Number(zoneId)));
		if (res.meta.requestStatus === "rejected") {
			toast.error("ลบข้อมูล ไม่สำเร็จ");
		} else {
			toast.success("ลบข้อมูล สำเร็จ");
			setIsOpenModalComfirm(false);
			setIsFinish(!isFinish);
		}
	};

	return (
		<Dialog open={isOpenModalComfirm} onClose={handleOnClose} fullWidth>
			<DialogTitle>{`ลบ`}</DialogTitle>
			<Divider />
			{isFetchingDeleteZone ? (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: 4,
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "end",
						gap: 2,
						margin: 2,
					}}
				>
					<Button type="button" variant="outlined" onClick={handleOnClose}>
						ยกเลิก
					</Button>
					<Button
						type="button"
						variant="contained"
						color="primary"
						onClick={handleOnConfirm}
					>
						ยืนยัน
					</Button>
				</Box>
			)}
		</Dialog>
	);
}
