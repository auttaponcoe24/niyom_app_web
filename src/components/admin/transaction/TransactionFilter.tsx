import { useGetCustomers } from "@/src/hooks/useCustomer";
import { useGetZone } from "@/src/hooks/useZone";
import { TransactionParams } from "@/src/interfaces/transaction.interface";
import { Button, DatePicker, Form, Select } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import dayjs from "@/utils/dayjs";

type Props = {
	params: TransactionParams;
	setParams: Dispatch<SetStateAction<TransactionParams>>;
};

interface TransactionForm {
	type?: "W" | "E";
	date?: dayjs.Dayjs;
	// zoneId?: number;
	customerId?: string;
}

export default function TransactionFilter({ params, setParams }: Props) {
	const { messages } = useIntl();
	const [form] = Form.useForm<TransactionForm>();
	const [zoneId, setZoneId] = useState<number | null>(null);

	const {
		data: customerListData,
		isLoading: isCustomerListLoading,
		isFetching: isCustomerListFetching,
		refetch: refetchCustomerList,
	} = useGetCustomers({
		pageSize: 999,
		start: 1,
		zoneId: zoneId ?? 0,
		keywords: "",
	});

	useEffect(() => {
		if (!form) return;

		if (params) {
			form.setFieldsValue({
				date: params.date ? dayjs(params.date, "YYYY-MM") : undefined,
				// zoneId: params.zoneId,
				type: params.type,
			});
			setZoneId(params.zoneId ?? null);
		}
	}, [form, params]);

	useEffect(() => {
		if (zoneId) {
			refetchCustomerList();
		}
	}, [zoneId]);

	const { data: zoneListData } = useGetZone({
		pageSize: 999,
		start: 1,
		keywords: "",
	});

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

	const handleOnFinishForm = (values: TransactionForm) => {
		setParams((prev) => ({
			...prev,
			type: values.type,
			date: values.date
				? dayjs(values.date).startOf("month").format("YYYY-MM-DD")
				: "",
			// zoneId: values.zoneId,
			customerId: values.customerId ? values.customerId : "",
		}));
	};

	return (
		<Form form={form} onFinish={handleOnFinishForm} layout="vertical">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Form.Item name={`type`} label="ประเภท">
					<Select style={{ width: "100%" }} options={typeList} />
				</Form.Item>

				<Form.Item name={`date`} label="ประจำเดือน">
					<DatePicker
						style={{ width: "100%" }}
						picker="month"
						format={`MM/YYYY`}
					/>
				</Form.Item>

				{/* <Form.Item name={`zoneId`} label="เขต">
					<Select
						style={{ width: "100%" }}
						options={zoneListData?.data.map((zone) => ({
							key: zone.id,
							label: zone.zoneName,
							value: zone.id,
						}))}
						onChange={(value) => {
							setZoneId(value);
						}}
					/>
				</Form.Item> */}

				<Form.Item name={`customerId`} label="ลูกค้า">
					<Select
						style={{ width: "100%" }}
						disabled={!zoneId}
						loading={isCustomerListLoading || isCustomerListFetching}
						options={customerListData?.data.map((customer) => ({
							key: customer.id,
							label: `${customer.firstName} ${customer.lastName}`,
							value: customer.id,
						}))}
						filterOption={(input, option) =>
							option?.label.toLowerCase().includes(input.toLowerCase()) || false
						}
					/>
				</Form.Item>

				<div className="flex items-center justify-between gap-4">
					<Button style={{ width: "100%" }} type="default" htmlType="reset">
						ล้าง
					</Button>
					<Button style={{ width: "100%" }} type="primary" htmlType="submit">
						ค้นหา
					</Button>
				</div>
			</div>
		</Form>
	);
}
