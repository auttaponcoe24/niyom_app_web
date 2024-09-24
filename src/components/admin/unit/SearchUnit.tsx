import { TParams } from "@/src/interfaces/unit.interface";
import { getZoneAll } from "@/src/store/slices/zoneSlice";
import { RootState, useAppDispatch } from "@/src/store/store";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

type Props = {
	params: TParams;
	setParams: Dispatch<SetStateAction<TParams>>;
};

export default function SearchUnit({ setParams }: Props) {
	const { messages } = useIntl();
	const [searchForm] = Form.useForm();
	const [isMonth, setIsMonth] = useState<string>("");
	const [isYear, setIsYear] = useState<string>("");
	const dispatch = useAppDispatch();
	const { data: dataZone, isLoading: isLoadingZone } = useSelector(
		(state: RootState) => state.zoneSlice
	);

	useEffect(() => {
		dispatch(getZoneAll({ start: 1, page_size: 999, keywords: "" }));
	}, [dispatch]);

	const handleOnSearch = (values: any) => {
		const month = values.date ? dayjs(values.date).format("M") : "";
		const year = values.date ? dayjs(values.date).format("YYYY") : "";
		console.log("values=>", values, month, year);

		setParams((prev) => ({
			...prev,
			zoneId: values.zoneId,
			month: month,
			year: year,
			type: values.type,
			keywords: values.keywords,
		}));
	};

	return (
		<Form form={searchForm} onFinish={handleOnSearch} layout="vertical">
			<div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
					name={"date"}
					label="ประจำเดือน"
					initialValue={dayjs(new Date())}
				>
					<DatePicker
						style={{ width: "100%" }}
						picker="month"
						format={"MM/YYYY"}
						// onChange={(date: dayjs.Dayjs) => {
						// 	setIsMonth(dayjs(date).format("M"));
						// 	setIsYear(dayjs(date).format("YYYY"));
						// }}
					/>
				</Form.Item>
				<Form.Item name={"type"} label="ประเภท" initialValue={"W"}>
					<Select
						style={{ width: "100%" }}
						options={[
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
						]}
					/>
				</Form.Item>
				<Form.Item name={`keywords`} label="ชื่อลูกค้า" initialValue={""}>
					<Input style={{ width: "100%" }} />
				</Form.Item>

				<Form.Item>
					<Button style={{ width: "100%" }} type="primary" htmlType="submit">
						{messages["text.search"] as string}
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
}
