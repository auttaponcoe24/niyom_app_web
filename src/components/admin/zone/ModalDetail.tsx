import { TMode } from "@/src/interfaces/zone.interface";
import {
	createZone,
	getById,
	getZoneAll,
	IZoneAction,
	updateZone,
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
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	isMode: TMode | null;
	setIsMode: Dispatch<SetStateAction<TMode | null>>;
	zoneId: number | null;
	setZoneId: React.Dispatch<React.SetStateAction<number | null>>;
	isFinish: boolean;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

export default function ModalDetail({
	isOpenModal,
	setIsOpenModal,
	isMode,
	setIsMode,
	zoneId,
	setZoneId,
	isFinish,
	setIsFinish,
}: Props) {
	const dispatch = useAppDispatch();
	const {
		isLoading: isLoadingZone,
		dataById: dataByIdZone,
		isLoadingById: isLoadingByIdZone,
		isFetchingUpdateZone,
	} = useSelector((state: RootState) => state.zoneSlice);
	// console.log("dataZone=>", dataByIdZone);

	var initialForm = {
		zone_name: "",
	};

	const { control, handleSubmit, reset } = useForm<IZoneAction>({
		defaultValues: initialForm,
	});

	useEffect(() => {
		if (isMode === "create") {
		} else if (isMode === "edit" && zoneId) {
			dispatch(getById({ id: zoneId }));
		}
	}, [isMode, zoneId, dispatch]);

	useEffect(() => {
		if (isMode === "edit" && dataByIdZone) {
			reset({
				zone_name: dataByIdZone.result.zone_name,
			});
		} else {
			reset(initialForm);
		}
	}, [dataByIdZone, isMode, reset]);

	const handleOnClose = () => {
		setIsOpenModal(false);
		setZoneId(null);
		setIsMode(null);
	};

	const onSubmit = async (values: IZoneAction) => {
		if (isMode === "create") {
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
		} else if (isMode === "edit") {
			const result = await dispatch(
				updateZone({ ...values, id: dataByIdZone.result.id })
			);
			console.log(result);
			if (result.meta.requestStatus === "fulfilled") {
				toast.success("แก้ไข สำเร็จ");
				setIsOpenModal(false);
				setIsFinish(!isFinish);
			} else {
				toast.error("แก้ไข ไม่สำเร็จ");
			}
		}
	};

	return (
		<Dialog open={isOpenModal} onClose={handleOnClose} fullWidth>
			<DialogTitle>{isMode === "create" ? "สร้างเขต" : "แก้ไขเขต"}</DialogTitle>
			<Divider />
			{isLoadingZone || isLoadingByIdZone || isFetchingUpdateZone ? (
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
						<Button onClick={() => reset()} type="reset" variant="outlined">
							ล้าง
						</Button>
						<Button type="submit" variant="contained" color="primary">
							บันทึก
						</Button>
					</DialogActions>
				</form>
			)}
		</Dialog>
	);
}
