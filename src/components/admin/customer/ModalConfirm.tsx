import { deleteCustomer } from "@/src/store/slices/customerSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { Button, Modal, Spin } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	customerId: number | null;
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
	const dispatch = useAppDispatch();
	const { isLoadingDelete } = useSelector(
		(state: RootState) => state.customerSlice
	);
	const handleOnConfirm = async () => {
		const result = await dispatch(deleteCustomer(customerId as number));
		if (result.meta.requestStatus === "fulfilled") {
			if (!!result.payload) {
				toast.success("ดำเนินการลบสำเร็จ");
				setIsOpenModal(false);
				setIsFinish(!isFinish);
			} else {
				toast.error("ดำเนินการลบไม่สำเร็จ");
			}
		} else {
			toast.error("ดำเนินการลบไม่สำเร็จ");
		}
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
			{isLoadingDelete ? (
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
				<div className="flex items-center justify-end mt-4">
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
