import ZoneComponent from "@/src/components/admin/zone";
import { Breadcrumb } from "antd";
import React from "react";

type Props = {};

export default function Zone({}: Props) {
	return (
		<section>
			<header className="tw-mb-5">
				<Breadcrumb
					items={[
						{
							key: 0,
							title: "หน้าหลัก",
						},
						{
							key: 1,
							title: "จัดการเขต",
						},
					]}
				/>
			</header>
			<div>
				<ZoneComponent />
			</div>
		</section>
	);
}
