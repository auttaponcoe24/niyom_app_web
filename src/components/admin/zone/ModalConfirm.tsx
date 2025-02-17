import { useDeleteZone } from "@/src/hooks/useZone";
import { Button, Modal, notification, Spin } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";

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

	const { mutate: deleteZone, isPending: isPendingDeleteZone } =
		useDeleteZone();

	const handleOnClose = () => {
		setIsOpenModalComfirm(false);
		setZoneId(null);
	};

	const handleOnConfirm = async () => {
		deleteZone(Number(zoneId), {
			onSuccess: (success) => {
				if (success) {
					notification.success({
						message: messages["notification.api.resp.success"] as string,
					});
					setIsOpenModalComfirm(false);
					setIsFinish(!isFinish);
				} else {
					notification.error({
						message: messages["notification.api.resp.error"] as string,
					});
				}
			},
			onError: (error) => {
				notification.error({
					message: messages["notification.api.resp.error"] as string,
				});
			},
		});
	};

	return (
		<Modal
			open={isOpenModalComfirm}
			onCancel={handleOnClose}
			centered
			title={`ลบ`}
			footer={null}
		>
			{isPendingDeleteZone ? (
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
