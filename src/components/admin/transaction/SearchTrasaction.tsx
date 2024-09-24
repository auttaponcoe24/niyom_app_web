import { TParams } from "@/src/interfaces/transaction.interface";
import { getZoneAll } from "@/src/store/slices/zoneSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
};

export default function SearchTrasaction({ params, setParams }: Props) {
	const { messages } = useIntl();
	const { data: dataZone, isLoading: isLoadingZone } = useSelector(
		(state: RootState) => state.zoneSlice
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		getZoneAll({ start: 1, page_size: 999, keywords: "" });
	}, [dispatch]);

	const [searchForm] = Form.useForm();

	const itemZone = [
		{
			key: 0,
			label: "น้ำ",
			value: "W",
		},
		{
			key: 1,
			label: "ไฟฟ้า",
			value: "E",
		},
	];

	const handleOnSubmitForm = (values: any) => {
		// console.log("values=>", values);
		const month = dayjs(values.date).format("M");
		const year = dayjs(values.date).format("YYYY");

		setParams((prev) => ({
			...prev,
			month,
			year,
			keywords: values.keywords,
			type: values.type,
			zoneId: values.zoneId,
		}));
	};

	return (
		<Form form={searchForm} layout="vertical" onFinish={handleOnSubmitForm}>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Form.Item
					name={"zoneId"}
					label="เขต"
					initialValue={dataZone?.result ? dataZone?.result[0]?.id : null}
				>
					<Select
						style={{ width: "100%" }}
						loading={isLoadingZone}
						options={dataZone?.result?.map((item: any, index: number) => ({
							key: index,
							label: item.zone_name,
							value: item.id,
						}))}
					/>
				</Form.Item>
				<Form.Item
					name={`date`}
					label="ประจำเดือนที่"
					initialValue={dayjs(new Date())}
				>
					<DatePicker
						style={{ width: "100%" }}
						picker="month"
						format={`MM/YYYY`}
					/>
				</Form.Item>
				<Form.Item name={`type`} label="ประเภท" initialValue={"W"}>
					<Select
						style={{ width: "100%" }}
						options={itemZone.map((item) => ({
							key: item.key,
							label: item.label,
							value: item.value,
						}))}
					/>
				</Form.Item>
				<Form.Item name={`keywords`} label="ชื่อลูกค้า" initialValue={``}>
					<Input placeholder="ชื่อลูกค้า" />
				</Form.Item>

				<div>
					<Form.Item>
						<Button style={{ width: "100%" }} type="primary" htmlType="submit">
							{messages["text.search"] as string}
						</Button>
					</Form.Item>
				</div>
			</div>
		</Form>
	);
}
