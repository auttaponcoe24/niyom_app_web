import ReportComponent from "@/src/components/admin/report";
import { Breadcrumb } from "antd";
import React from "react";
import { useIntl } from "react-intl";

type Props = {};

export default function Report({}: Props) {
	const { messages } = useIntl();
	return (
		<section>
			<header className="mb-5">
				<Breadcrumb
					items={[
						{
							key: 0,
							title: messages["main"] as string,
						},
						{
							key: 1,
							title: messages["report"] as string,
						},
					]}
				/>
			</header>

			<div>{<ReportComponent />}</div>
		</section>
	);
}
