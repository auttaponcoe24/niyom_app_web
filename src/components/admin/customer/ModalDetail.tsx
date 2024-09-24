import { TActionValues, TMode } from "@/src/interfaces/customer.interface";
import {
	createCustomer,
	getCustomerId,
	updateCustomer,
} from "@/src/store/slices/customerSlice";
import { useGetPrefix } from "@/src/store/slices/prefixSlice";
import { getZoneAll } from "@/src/store/slices/zoneSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { Button, Form, Input, Modal, notification, Select, Spin } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

type Props = {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	isMode: TMode | null;
	setIsMode: Dispatch<SetStateAction<TMode | null>>;
	customerId: number | null;
	setCustomerId: React.Dispatch<React.SetStateAction<number | null>>;
	isFinish: boolean;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

export default function ModalDetail({
	isModalOpen,
	setIsModalOpen,
	isMode,
	setIsMode,
	isFinish,
	setIsFinish,
	customerId,
	setCustomerId,
}: Props) {
	const { messages } = useIntl();
	const dispatch = useAppDispatch();
	const { data: dataZone, isLoading: isLoadingZone } = useSelector(
		(state: RootState) => state.zoneSlice
	);
	const [form] = Form.useForm();

	const {
		dataById: dataCustomerId,
		isLoadingById: isLoadingCustomerId,
		isLoadingCreate,
		isLoadingUpdate,
	} = useSelector((state: RootState) => state.customerSlice);

	const { data: dataPrefix, isLoading: isLoadingPrefix } = useSelector(
		(state: RootState) => state.prefixSlice
	);

	// console.log("dataCustomerId=>", dataCustomerId);

	const initialForm: TActionValues = {
		card_id: "",
		firstname: "",
		lastname: "",
		address: "",
		house_number: "",
		phone: "",
		zoneId: null,
		prefixId: null,
	};

	useEffect(() => {
		dispatch(getZoneAll({ start: 1, page_size: 999, keywords: "" }));
		dispatch(useGetPrefix());
	}, []);

	useEffect(() => {
		if (isMode === "create") {
		} else if (isMode === "edit" && customerId) {
			dispatch(getCustomerId(customerId));
		}
	}, [isMode, customerId, dispatch]);

	useEffect(() => {
		if (isMode === "edit" && dataCustomerId) {
			form.setFieldsValue({
				id: dataCustomerId?.result?.id,
				firstname: dataCustomerId?.result?.firstname,
				lastname: dataCustomerId?.result?.lastname,
				card_id: dataCustomerId?.result?.card_id,
				phone: dataCustomerId?.result?.phone,
				house_number: dataCustomerId?.result?.house_number,
				address: dataCustomerId?.result?.address,
				zoneId: dataCustomerId?.result?.zoneId,
				prefixId: dataCustomerId?.result?.prefixId,
			});
		} else {
			form.setFieldsValue(initialForm);
		}
	}, [dataCustomerId, isMode]);

	const handleOnClose = () => {
		setIsModalOpen(false);
		setCustomerId(null);
		setIsMode(null);
	};

	const onSubmit = async (values: TActionValues) => {
		if (isMode === "create") {
			const result = await dispatch(createCustomer(values));
			// console.log("result=>", result);
			if (result.meta.requestStatus === "fulfilled") {
				if (!!result.payload) {
					notification.success({
						message: messages["notification.api.resp.success"] as string,
					});
					setIsModalOpen(false);
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
			// console.log("values=>", values);

			const result = await dispatch(
				updateCustomer({ ...values, id: dataCustomerId?.result?.id })
			);
			if (result.meta.requestStatus === "fulfilled") {
				if (!!result.payload) {
					notification.success({
						message: messages["notification.api.resp.success"] as string,
					});
					setIsModalOpen(false);
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
		}
	};

	return (
		<Modal
			open={isModalOpen}
			onCancel={handleOnClose}
			title={isMode === "create" ? "สร้างลูกค้า" : "แก้ไขลูกค้า"}
			footer={null}
			destroyOnClose
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
				<Form form={form} onFinish={onSubmit} layout="vertical">
					<Form.Item name={`prefixId`} label="คำนาม" required>
						<Select
							loading={isLoadingPrefix}
							options={dataPrefix?.result?.map((item: any, index: number) => ({
								key: index,
								label: item.prefix_name,
								value: item.id,
							}))}
						/>
					</Form.Item>
					<Form.Item
						label={`ชื่อ`}
						name="firstname"
						rules={[
							{
								required: true,
								message: "กรุณากรอก",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label={`นามสกุล`}
						name="lastname"
						rules={[
							{
								required: true,
								message: "กรุณากรอก",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label={`รหัสบัตรประจำตัวประชาชน`}
						name="card_id"
						rules={[
							{
								required: true,
								message: "กรุณากรอก",
							},
							{
								validator: (_, value) => {
									const idCardPattern = /^\d{13}$/;
									if (!value) {
										return Promise.reject("กรุณากรอกรหัสประจำตัวประชาชน");
									} else if (!idCardPattern.test(value)) {
										return Promise.reject(
											"ระบุไม่ถูกต้อง ต้องเป็นตัวเลข 13 หลัก"
										);
									}
									return Promise.resolve();
								},
							},
						]}
					>
						<Input maxLength={13} showCount />
					</Form.Item>
					<Form.Item
						label={`เบอร์โทร`}
						name="phone"
						rules={[
							{
								required: true,
								message: "กรุณากรอก",
							},
							{
								validator: (_, value) => {
									const phonePattern = /^\d{10}$/;
									if (!value) {
										return Promise.reject("กรุณากรอกเบอร์โทรศัพท์");
									} else if (!phonePattern.test(value)) {
										return Promise.reject(
											"ระบุไม่ถูกต้อง ต้องเป็นตัวเลข 10 หลัก"
										);
									}
									return Promise.resolve();
								},
							},
						]}
					>
						<Input maxLength={10} showCount />
					</Form.Item>
					<Form.Item
						label={`บ้านเลขที่`}
						name="house_number"
						rules={[
							{
								required: false,
								message: "กรุณากรอก",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label={`ที่อยู่`}
						name="address"
						rules={[
							{
								required: false,
								message: "กรุณากรอก",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label={`ชื่อเขต`}
						name="zoneId"
						rules={[
							{
								required: true,
								message: "กรุณาเลือกเขต",
							},
						]}
					>
						<Select
							options={dataZone?.result?.map((item: any, index: number) => ({
								key: index,
								label: item.zone_name,
								value: item.id,
							}))}
						/>
					</Form.Item>
					<Form.Item>
						<div className="flex items-center justify-end gap-2 mt-2">
							<Button htmlType="reset" type="default">
								{messages["text.reset"] as string}
							</Button>
							<Button htmlType="submit" type="primary">
								{messages["text.save"] as string}
							</Button>
						</div>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
}
