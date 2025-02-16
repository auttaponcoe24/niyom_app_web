import {
	useCreateZone,
	useGetZoneById,
	useUpdateZone,
} from "@/src/hooks/useZone";
import { CreateZone, TMode, UpdateZone } from "@/src/interfaces/zone.interface";
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

interface ZoneForm {
	zone_name: string;
}

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
	const [form] = Form.useForm<ZoneForm>();

	const {
		data: zoneIdData,
		isLoading: isLoadingZoneId,
		isFetching: isFetchingZoneId,
		refetch: refetchZoneId,
	} = useGetZoneById(zoneId as number);

	const { mutate: createZone, isPending: isPendingCreateZone } =
		useCreateZone();
	const { mutate: updateZone, isPending: isPendingUpdateZone } =
		useUpdateZone();

	useEffect(() => {
		if (isMode === "create") {
		} else if (isMode === "edit" && zoneId) {
			refetchZoneId();
		}
	}, [isMode, zoneId]);

	useEffect(() => {
		if (isMode === "edit" && zoneIdData) {
			form.setFieldsValue({
				zone_name: zoneIdData.data.zoneName,
			});
		} else {
		}
	}, [form, zoneIdData, isMode]);

	const handleOnClose = () => {
		setIsOpenModal(false);
		setZoneId(null);
		setIsMode(null);
	};

	const handleOnSubmit = async (values: ZoneForm) => {
		const create: CreateZone = {
			zoneName: values.zone_name,
		};

		const update: UpdateZone = {
			id: zoneIdData?.data?.id,
			zoneName: values.zone_name,
		};

		const onSuccess = (success: any) => {
			if (success) {
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
		};

		const onError = () => {
			notification.error({
				message: messages["notification.api.resp.error"] as string,
			});
		};
		if (isMode === "create") {
			createZone(create, { onSuccess, onError });
		} else if (isMode === "edit") {
			updateZone(update, { onSuccess, onError });
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
			{isLoadingZoneId || isFetchingZoneId ? (
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
							<Button
								htmlType="submit"
								type="primary"
								loading={isPendingCreateZone || isPendingUpdateZone}
							>
								{messages["text.save"] as string}
							</Button>
						</div>
					</Form>
				</div>
			)}
		</Modal>
	);
}
