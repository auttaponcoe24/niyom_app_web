import CustomerComponent from "@/src/components/admin/customer";
import { Breadcrumb } from "antd";
import React from "react";

type Props = {};

export default function CustomerPage({}: Props) {
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
							title: "จัดการลูกค้า",
						},
					]}
				/>
			</header>

			{/* <section className="w-full px-6 py-2 min-h-[calc(100vh-250px)]"> */}
			<div>
				<CustomerComponent />
			</div>
		</section>
	);
}
