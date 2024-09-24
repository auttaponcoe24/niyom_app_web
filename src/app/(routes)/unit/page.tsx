import UnitComponent from "@/src/components/admin/unit";
import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

type Props = {};

export default function UnitPage({}: Props) {
	return (
		<section>
			<header className="mb-5">
				<Breadcrumb
					items={[
						{
							key: 0,
							title: "หน้าหลัก",
						},
						{
							key: 1,
							title: "จัดการหน่วยมิเตอร์",
						},
					]}
				/>
			</header>

			<div>
				<UnitComponent />
			</div>
		</section>
	);
}
