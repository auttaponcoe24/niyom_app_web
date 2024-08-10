import {
	createZone,
	getZoneAll,
	IZoneAction,
} from "@/src/store/slices/zoneSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	isFinish: boolean;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

export default function ModalDetail({
	isOpenModal,
	setIsOpenModal,
	isFinish,
	setIsFinish,
}: Props) {
	const dispatch = useAppDispatch();
	const { isLoading: isLoadingZone } = useSelector(
		(state: RootState) => state.zoneSlice
	);

	const initialForm = {
		zone_name: "",
	};

	const { control, handleSubmit, reset } = useForm<IZoneAction>({
		defaultValues: initialForm,
	});

	const handleOnClose = () => {
		setIsOpenModal(false);
	};

	const onSubmit = async (values: IZoneAction) => {
		const result = await dispatch(createZone(values));
		// console.log("result=>", result);

		if (createZone.fulfilled.match(result)) {
			if (!!result.payload) {
				toast.success("สร้างเขต สำเร็จ");
				setIsOpenModal(false);
				setIsFinish(!isFinish);
			} else {
				toast.error("สร้างเขต ไม่สำเร็จ");
			}
		} else {
			toast.error("สร้างเขต ไม่สำเร็จ");
		}
	};

	return (
		<Dialog open={isOpenModal} onClose={handleOnClose} fullWidth>
			<DialogTitle>สร้างเขต</DialogTitle>
			<Divider />
			{isLoadingZone ? (
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<Controller
							control={control}
							name="zone_name"
							render={({ field }) => (
								<TextField
									{...field}
									autoFocus
									required
									margin="dense"
									id="name"
									name="email"
									label="ชื่อเขต"
									type="text"
									fullWidth
									variant="outlined"
								/>
							)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => reset()} type="reset">
							ล้าง
						</Button>
						<Button type="submit">บันทึก</Button>
					</DialogActions>
				</form>
			)}
		</Dialog>
	);
}
