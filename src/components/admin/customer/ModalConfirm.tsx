import { useDeleteCustomer } from "@/src/hooks/useCustomer";
import { Button, Modal, notification, Spin } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	customerId: string | null;
	isFinish: boolean;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

export default function ModalConfirm({
	isOpenModal,
	setIsOpenModal,
	customerId,
	isFinish,
	setIsFinish,
}: Props) {
	const { messages } = useIntl();

	const { mutate: deleteCustomer, isPending: isPendingDeleteCusotmer } =
		useDeleteCustomer();

	const handleOnConfirm = async () => {
		deleteCustomer(String(customerId), {
			onSuccess: (success) => {
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
			},
			onError: (error) => {
				notification.error({
					message: messages["notification.api.resp.error"] as string,
				});
			},
		});
	};

	const handleOnClose = () => {
		setIsOpenModal(false);
	};
	return (
		<Modal
			open={isOpenModal}
			onCancel={handleOnClose}
			title={"ยืนยันการลบ"}
			destroyOnClose
			centered
			footer={null}
		>
			{false ? (
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
				<div className="flex items-center justify-end mt-4 gap-4">
					<Button type="default" onClick={handleOnClose}>
						{messages["text.cancel"] as string}
					</Button>
					<Button
						type="primary"
						onClick={handleOnConfirm}
						loading={isPendingDeleteCusotmer}
					>
						{messages["text.confirm"] as string}
					</Button>
				</div>
			)}
		</Modal>
	);
}
