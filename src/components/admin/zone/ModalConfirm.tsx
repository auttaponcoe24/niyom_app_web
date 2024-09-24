import { deleteZone } from "@/src/store/slices/zoneSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { Button, Divider, Modal, notification, Spin } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
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
	const { messages } = useIntl();
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
			notification.error({
				message: messages["notification.api.resp.error"] as string,
			});
		} else {
			notification.success({
				message: messages["notification.api.resp.success"] as string,
			});
			setIsOpenModalComfirm(false);
			setIsFinish(!isFinish);
		}
	};

	return (
		<Modal
			open={isOpenModalComfirm}
			onCancel={handleOnClose}
			title={`ลบ`}
			footer={null}
		>
			{isFetchingDeleteZone ? (
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
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "end",
						gap: 2,
						margin: 2,
					}}
				>
					<Button type="default" onClick={handleOnClose}>
						{messages["text.cancel"] as string}
					</Button>
					<Button type="primary" onClick={handleOnConfirm}>
						{messages["text.confirm"] as string}
					</Button>
				</div>
			)}
		</Modal>
	);
}
