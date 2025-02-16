import { useGetCustomers } from "@/src/hooks/useCustomer";
import { useGetZone } from "@/src/hooks/useZone";
import { CustomerParams } from "@/src/interfaces/customer.interface";
import { Button, Form, Input, Select } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
	params: CustomerParams;
	setParams: Dispatch<SetStateAction<CustomerParams>>;
};

interface CustomerForm {
	keywords?: string;
	zoneId?: number;
}

export default function CustomerFilter({ params, setParams }: Props) {
	const [form] = Form.useForm<CustomerForm>();
	const [zoneId, setZoneId] = useState<number | null>(null);

	const {
		data: zoneListData,
		isLoading: isZoneListLoading,
		isFetching: isZoneListFetching,
		refetch: refetchZoneListData,
	} = useGetZone({
		pageSize: 999,
		start: 1,
		keywords: "",
	});

	const handleOnFilter = (values: CustomerForm) => {
		setParams((prev) => ({
			...prev,
			zoneId: values.zoneId ? values.zoneId : 0,
			keywords: values.keywords ? values.keywords : "",
		}));
	};
	return (
		<Form form={form} onFinish={handleOnFilter} layout="vertical">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Form.Item name={`zoneId`} label="เขต">
					<Select
						style={{ width: "100%" }}
						loading={isZoneListLoading || isZoneListFetching}
						options={zoneListData?.data?.map((zone, index) => ({
							key: index,
							label: zone.zoneName,
							value: zone.id,
						}))}
						onChange={(value) => {
							setZoneId(value);
						}}
					/>
				</Form.Item>
				<Form.Item name={`keywords`} label="ลูกค้า">
					<Input style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item label=" ">
					<div className="flex items-center justify-between gap-4">
						<Button style={{ width: "100%" }} type="default" htmlType="reset">
							ล้าง
						</Button>
						<Button style={{ width: "100%" }} type="primary" htmlType="submit">
							ค้นหา
						</Button>
					</div>
				</Form.Item>
			</div>
		</Form>
	);
}
