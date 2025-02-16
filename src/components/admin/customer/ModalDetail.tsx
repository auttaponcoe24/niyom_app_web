import {
	useCreateCustomer,
	useGetCustomerId,
	useUpdateCustomer,
} from "@/src/hooks/useCustomer";
import { useGetPrefixList } from "@/src/hooks/usePrefix";
import { useGetZone } from "@/src/hooks/useZone";
import {
	CreateCustomer,
	CustomerMode,
	UpdateCustomer,
} from "@/src/interfaces/customer.interface";
import {
	Button,
	Checkbox,
	Divider,
	Form,
	Input,
	Modal,
	notification,
	Select,
	Spin,
} from "antd";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

type Props = {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	isMode: CustomerMode;
	setIsMode: Dispatch<SetStateAction<CustomerMode>>;
	customerId: string | null;
	setCustomerId: React.Dispatch<React.SetStateAction<string | null>>;
	isFinish: boolean;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

interface CustomerForm {
	no: number;
	prefixId: number;
	firstName: string;
	lastName: string;
	cardId: string;
	phoneNumber: string;
	houseNumber: string;
	address: string;
	zoneId: number;
	isServiceWater: boolean;
	isServiceElectric: boolean;
	isActive: boolean;
}

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
	const [form] = Form.useForm<CustomerForm>();

	const {
		data: customerIdData,
		isLoading: isCustomerIdLoading,
		isFetching: isCustomerIdFetching,
		refetch: refetchCustomerId,
	} = useGetCustomerId(customerId as string);

	const {
		data: prefixListData,
		isLoading: isPrefixListLoading,
		isFetching: isPrefixListFetching,
		refetch: refetchPrefixList,
	} = useGetPrefixList({
		keywords: "",
		pageSize: 999,
		start: 1,
	});

	const {
		data: zoneListData,
		isLoading: isZoneListLoading,
		isFetching: isZoneListFetching,
		refetch: refetchZoneList,
	} = useGetZone({
		pageSize: 999,
		start: 1,
		keywords: "",
	});

	const { mutate: createCustomer, isPending: isCreateCustomerPending } =
		useCreateCustomer();

	const { mutate: updateCustomer, isPending: isUpdateCustomerPending } =
		useUpdateCustomer();

	useEffect(() => {
		if (isModalOpen && customerId && isMode === "edit") {
			refetchCustomerId();
			refetchPrefixList();
			refetchZoneList();
		}
	}, [isModalOpen, customerId, isMode]);

	useEffect(() => {
		if (!form) return; // ป้องกันการเรียก `setFieldsValue` ก่อนที่ `form` จะพร้อม

		const defaultValues = {
			no: undefined,
			prefixId: undefined,
			firstName: "",
			lastName: "",
			cardId: "",
			phoneNumber: "",
			houseNumber: "",
			address: "",
			zoneId: undefined,
			isServiceWater: undefined,
			isServiceElectric: undefined,
			isActive: true,
		};

		if (customerIdData && isMode === "edit") {
			form.setFieldsValue({
				...defaultValues, // ตั้งค่าเริ่มต้น
				...customerIdData.data, // นำข้อมูลจาก API มาเติม
				prefixId: customerIdData.data.prefix?.id ?? undefined,
				zoneId: customerIdData.data.zone?.id ?? undefined,
			});
		} else {
			form.setFieldsValue(defaultValues);
		}
	}, [form, isModalOpen, isMode, customerIdData]);

	const handleOnClose = () => {
		setIsModalOpen(false);
		setCustomerId(null);
		setIsMode(null);
	};

	const onSubmit = async (values: CustomerForm) => {
		const onSuccess = (success: any) => {
			if (success) {
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
		};
		const onError = (error: any) => {
			notification.error({
				message: messages["notification.api.resp.error"] as string,
			});
		};
		const create: CreateCustomer = {
			no: +values.no,
			prefixId: +values.prefixId,
			firstName: values.firstName,
			lastName: values.lastName,
			cardId: values.cardId,
			phoneNumber: values.phoneNumber,
			houseNumber: values.houseNumber,
			address: values.address,
			zoneId: +values.zoneId,
			isServiceWater: values.isServiceWater,
			isServiceElectric: values.isServiceElectric,
			isActive: values.isActive,
		};

		if (customerIdData && isMode === "edit") {
			const update: UpdateCustomer = {
				...create,
				id: customerIdData?.data.id,
			};

			updateCustomer(update, { onSuccess, onError });
		} else if (isMode === "create") {
			createCustomer(create, { onSuccess, onError });
		}
	};

	return (
		<Modal
			open={isModalOpen}
			onCancel={handleOnClose}
			title={isMode === "create" ? "สร้างลูกค้า" : "แก้ไขลูกค้า"}
			footer={null}
			destroyOnClose
			width={800}
		>
			{isCustomerIdLoading || isCustomerIdFetching ? (
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
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Form.Item
							label={`เขต`}
							name="zoneId"
							rules={[
								{
									required: true,
									message: "กรุณาเลือกเขต",
								},
							]}
						>
							<Select
								options={zoneListData?.data?.map((item, index) => ({
									key: index,
									label: item.zoneName,
									value: item.id,
								}))}
								loading={isZoneListLoading || isZoneListFetching}
							/>
						</Form.Item>
						<Form.Item name={`no`} label="ลำดับ" required>
							<Input type="number" />
						</Form.Item>
						<Form.Item name={`prefixId`} label="คำนาม" required>
							<Select
								loading={isPrefixListLoading || isPrefixListFetching}
								options={prefixListData?.data?.map((item, index) => ({
									key: index,
									label: item.prefixName,
									value: item.id,
								}))}
							/>
						</Form.Item>

						<Form.Item
							label={`ชื่อ`}
							name="firstName"
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
							name="lastName"
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
							label={`ประจำตัวประชาชน`}
							name="cardId"
							rules={[
								{
									required: false,
									message: "กรุณากรอก",
								},
								// {
								// 	validator: (_, value) => {
								// 		const idCardPattern = /^\d{13}$/;
								// 		if (!value) {
								// 			return Promise.reject("กรุณากรอกรหัสประจำตัวประชาชน");
								// 		} else if (!idCardPattern.test(value)) {
								// 			return Promise.reject(
								// 				"ระบุไม่ถูกต้อง ต้องเป็นตัวเลข 13 หลัก"
								// 			);
								// 		}
								// 		return Promise.resolve();
								// 	},
								// },
							]}
						>
							<Input maxLength={13} showCount />
						</Form.Item>
						<Form.Item
							label={`เบอร์โทร`}
							name="phoneNumber"
							rules={[
								{
									required: false,
									message: "กรุณากรอก",
								},
								// {
								// 	validator: (_, value) => {
								// 		const phonePattern = /^\d{10}$/;
								// 		if (!value) {
								// 			return Promise.reject("กรุณากรอกเบอร์โทรศัพท์");
								// 		} else if (!phonePattern.test(value)) {
								// 			return Promise.reject(
								// 				"ระบุไม่ถูกต้อง ต้องเป็นตัวเลข 10 หลัก"
								// 			);
								// 		}
								// 		return Promise.resolve();
								// 	},
								// },
							]}
						>
							<Input maxLength={10} showCount />
						</Form.Item>
						<Form.Item
							label={`บ้านเลขที่`}
							name="houseNumber"
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
							label="บริการน้ำ"
							name={`isServiceWater`}
							// valuePropName="checked"
							rules={[
								{
									required: true,
									message: "กรุณาเลือก",
								},
							]}
						>
							<Select
								options={[
									{
										key: 1,
										label: "ใช้บริการ",
										value: true,
									},
									{
										key: 2,
										label: "ไม่ใช้บริการ",
										value: false,
									},
								].map((item) => ({
									key: item.key,
									label: (
										<div
											className={item.value ? `text-green-600` : `text-red-600`}
										>
											{item.label}
										</div>
									),
									value: item.value,
								}))}
							/>
						</Form.Item>
						<Form.Item
							label="บริการไฟฟ้า"
							name={`isServiceElectric`}
							// valuePropName="checked"
							rules={[
								{
									required: true,
									message: "กรุณาเลือก",
								},
							]}
						>
							<Select
								options={[
									{
										key: 1,
										label: "ใช้บริการ",
										value: true,
									},
									{
										key: 2,
										label: "ไม่ใช้บริการ",
										value: false,
									},
								].map((item) => ({
									key: item.key,
									label: (
										<div
											className={item.value ? `text-green-600` : `text-red-600`}
										>
											{item.label}
										</div>
									),
									value: item.value,
								}))}
							/>
						</Form.Item>

						<Form.Item
							label="ลูกค้า"
							name={`isActive`}
							rules={[
								{
									required: true,
									message: "กรุณาเลือก",
								},
							]}
						>
							<Select
								options={[
									{
										key: 1,
										label: "ยังใช้บริการ",
										value: true,
									},
									{
										key: 2,
										label: "ยกเลิกบริการ",
										value: false,
									},
								].map((item) => ({
									key: item.key,
									label: (
										<div
											className={item.value ? `text-green-600` : `text-red-600`}
										>
											{item.label}
										</div>
									),
									value: item.value,
								}))}
							/>
						</Form.Item>
					</div>
					<Divider />
					<div>
						<div className="flex items-center justify-end gap-2 mt-2">
							<Button className="w-[100px]" htmlType="reset" type="default">
								{messages["text.reset"] as string}
							</Button>
							<Button
								loading={isCreateCustomerPending || isUpdateCustomerPending}
								className="w-[100px]"
								htmlType="submit"
								type="primary"
							>
								{messages["text.save"] as string}
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Modal>
	);
}
