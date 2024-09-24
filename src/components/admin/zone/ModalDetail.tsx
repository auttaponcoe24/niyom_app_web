import { TMode } from "@/src/interfaces/zone.interface";
import {
	createZone,
	getById,
	getZoneAll,
	IZoneAction,
	updateZone,
} from "@/src/store/slices/zoneSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { Button, Divider, Form, Input, Modal, notification, Spin } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useIntl } from "react-intl";
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
	const { messages } = useIntl();
	const dispatch = useAppDispatch();

	const {
		isLoading: isLoadingZone,
		dataById: dataByIdZone,
		isLoadingById: isLoadingByIdZone,
		isFetchingUpdateZone,
	} = useSelector((state: RootState) => state.zoneSlice);
	// console.log("dataZone=>", dataByIdZone);

	const [form] = Form.useForm();

	useEffect(() => {
		if (isMode === "create") {
		} else if (isMode === "edit" && zoneId) {
			dispatch(getById({ id: zoneId }));
		}
	}, [isMode, zoneId, dispatch]);

	useEffect(() => {
		if (isMode === "edit" && dataByIdZone) {
			form.setFieldsValue({
				zone_name: dataByIdZone.result.zone_name,
			});
		} else {
		}
	}, [dataByIdZone, isMode]);

	const handleOnClose = () => {
		setIsOpenModal(false);
		setZoneId(null);
		setIsMode(null);
	};

	const handleOnSubmit = async (values: IZoneAction) => {
		if (isMode === "create") {
			const result = await dispatch(createZone(values));
			// console.log("result=>", result);

			if (createZone.fulfilled.match(result)) {
				if (!!result.payload) {
					notification.success({
						message: messages["notification.api.resp.success"] as string,
					});
					setIsOpenModal(false);
					setIsFinish(!isFinish);
				} else {
					notification.error({
						message: messages["notification.api.resp.error"] as string,
					});
				}
			} else {
				notification.error({
					message: messages["notification.api.resp.error"] as string,
				});
			}
		} else if (isMode === "edit") {
			const result = await dispatch(
				updateZone({ ...values, id: dataByIdZone.result.id })
			);
			console.log(result);
			if (result.meta.requestStatus === "fulfilled") {
				notification.success({
					message: messages["notification.api.resp.success"] as string,
				});
				setIsOpenModal(false);
				setIsFinish(!isFinish);
			} else {
				notification.error({
					message: messages["notification.api.resp.error"] as string,
				});
			}
		}
	};

	return (
		<Modal
			open={isOpenModal}
			onCancel={handleOnClose}
			title={isMode === "create" ? "สร้างเขต" : "แก้ไขเขต"}
			footer={null}
			centered
			destroyOnClose
		>
			{isLoadingZone || isLoadingByIdZone || isFetchingUpdateZone ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: 4,
					}}
				>
					<Spin />
				</div>
			) : (
				<div>
					<Form form={form} onFinish={handleOnSubmit} layout="vertical">
						<Form.Item name="zone_name" label="ชื่อเขต">
							<Input size="large" />
						</Form.Item>
						<div className="flex items-center justify-end gap-2 mt-2">
							<Button htmlType="reset" type="default">
								{messages["text.reset"] as string}
							</Button>
							<Button htmlType="submit" type="primary">
								{messages["text.save"] as string}
							</Button>
						</div>
					</Form>
				</div>
			)}
		</Modal>
	);
}
