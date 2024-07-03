import { useCreateZone } from "@/src/hooks/useZone";
import {
	Box,
	Button,
	Card,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function ModalDetail({ isOpenModal, setIsOpenModal }: Props) {
	const { mutate: mutateCreateZone, isPending: isPendingCreateZone } =
		useCreateZone();

	const initialForm = {
		zone_name: "",
	};

	const { control, handleSubmit, reset } = useForm<{ zone_name: string }>({
		defaultValues: initialForm,
	});

	const handleOnClose = () => {
		setIsOpenModal(false);
	};

	const onSubmit = async (values: { zone_name: string }) => {
		console.log(values);

		const onSuccess = () => {
			setIsOpenModal(false);
			toast.success("สร้างเขต สำเร็จ");
		};
		const onError = () => {
			toast.error("สร้างเขต ไม่สำเร็จ");
		};

		mutateCreateZone(values, { onSuccess, onError });
	};
	return (
		<Dialog open={isOpenModal} onClose={handleOnClose} fullWidth>
			<DialogTitle>สร้างเขต</DialogTitle>
			<Divider />
			{isPendingCreateZone ? (
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
