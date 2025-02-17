import { useGetCustomers } from "@/src/hooks/useCustomer";
import { useUpdateOrCreateUnitList } from "@/src/hooks/useUnit";
import { useGetZone } from "@/src/hooks/useZone";
import {
	UnitData,
	UnitMode,
	UpdateOrCreateUnit,
} from "@/src/interfaces/unit.interface";
import {
	Button,
	DatePicker,
	Divider,
	Form,
	Input,
	Modal,
	notification,
	Select,
} from "antd";
import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";

type Props = {
	isModalDetail: boolean;
	setIsModalDetail: Dispatch<SetStateAction<boolean>>;
	unitData: UnitData | null;
	setUnitData: Dispatch<SetStateAction<UnitData | null>>;
	unitMode: UnitMode;
	setUnitMode: Dispatch<SetStateAction<UnitMode>>;
	setIsFinish: Dispatch<SetStateAction<boolean>>;
};

interface UnitForm {
	type: "W" | "E";
	data: moment.Moment;
	zoneId: number;
	customerId: string;
	unitNumber: number;
}

export default function UnitModalDetail({
	isModalDetail,
	setIsModalDetail,
	unitData,
	setUnitData,
	unitMode,
	setUnitMode,
	setIsFinish,
}: Props) {
	const { messages } = useIntl();
	const [form] = Form.useForm<UnitForm>();
	const [zoneId, setZoneId] = useState<number | null>(null);

	useEffect(() => {
		if (!form) return; // ป้องกันการเรียก `setFieldsValue` ก่อนที่ `form` จะพร้อม

		if (unitData && isModalDetail) {
			form.setFieldsValue({
				type: unitData.type,
				data: unitData.date ? moment(unitData.date, "YYYY-MM-DD") : undefined,
				zoneId: unitData.zoneId,
				customerId: unitData.customerId,
				unitNumber: unitData.unitNumber,
			});

			setZoneId(unitData.zoneId);
		}
	}, [form, isModalDetail, unitData]);

	const { data: zoneListData } = useGetZone({
		pageSize: 999,
		start: 1,
		keywords: "",
	});

	const {
		data: customerListData,
		isLoading: isCustomerLoading,
		isFetching: isCustomerFetching,
		refetch: refetchCustomerList,
	} = useGetCustomers({
		pageSize: 999,
		start: 1,
		keywords: "",
		zoneId: zoneId ?? 0,
	});

	const {
		mutate: updateOrCreateUnitList,
		isPending: isUpdateOrCreateUnitList,
	} = useUpdateOrCreateUnitList();

	const typeList = [
		{
			key: 1,
			label: "น้ำ",
			value: "W",
		},
		{
			key: 2,
			label: "ไฟฟ้า",
			value: "E",
		},
	];

	useEffect(() => {
		if (zoneId) {
			refetchCustomerList();
		}
	}, [zoneId]);

	const handleOnFinishForm = (values: UnitForm) => {
		const onSuccess = (success: any) => {
			if (success) {
				notification.success({
					message: messages["notification.api.resp.success"] as string,
				});
				setIsModalDetail(false);
				setIsFinish((prev) => !prev);
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

		if (unitData) {
			const updateOrCreate: UpdateOrCreateUnit = {
				id: unitData?.id,
				zoneId: values.zoneId,
				type: values.type,
				date: values.data
					? moment(values.data).startOf("month").format("YYYY-MM-DD")
					: "",
				customerId: values.customerId,
				unitNumber: +values.unitNumber,
			};

			updateOrCreateUnitList([updateOrCreate], { onSuccess, onError });
		}
	};

	const handleOnCancel = () => {
		setIsModalDetail(false);
		setUnitData(null);
		setUnitMode(null);
		setZoneId(null);
	};
	return (
		<Modal
			title={`สร้าง / แก้ไข`}
			open={isModalDetail}
			onCancel={handleOnCancel}
			footer={null}
		>
			<Form
				form={form}
				onFinish={handleOnFinishForm}
				layout="horizontal"
				labelAlign="left"
				wrapperCol={{
					span: 16,
				}}
				labelCol={{
					span: 6,
				}}
			>
				<Form.Item name={`type`} label="ประเภท">
					<Select disabled style={{ width: "100%" }} options={typeList} />
				</Form.Item>
				<Form.Item name={`data`} label="ประจำเดือน">
					<DatePicker disabled style={{ width: "100%" }} format="MM/YYYY" />
				</Form.Item>
				<Form.Item name={`zoneId`} label="เขต">
					<Select
						disabled
						style={{ width: "100%" }}
						options={zoneListData?.data.map((zone, index) => ({
							key: index,
							label: zone.zoneName,
							value: zone.id,
						}))}
					/>
				</Form.Item>
				<Form.Item name={`customerId`} label="ชื่อ - สกุล">
					<Select
						disabled
						loading={isCustomerLoading || isCustomerFetching}
						style={{ width: "100%" }}
						options={customerListData?.data.map((customer, index) => ({
							key: customer.id,
							label: `${customer.firstName} ${customer.lastName}`,
							value: customer.id,
						}))}
					/>
				</Form.Item>
				<Form.Item name={`unitNumber`} label="หน่วย">
					<Input style={{ width: "100%" }} type="number" />
				</Form.Item>

				<Divider />
				<div className="flex items-center justify-end gap-4">
					<Button type="default" htmlType="button" onClick={handleOnCancel}>
						ปิด
					</Button>
					<Button type="primary" htmlType="submit">
						บันทึก
					</Button>
				</div>
			</Form>
		</Modal>
	);
}
