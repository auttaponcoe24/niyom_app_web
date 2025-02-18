import TransactionComponent from "@/src/components/admin/transaction";
import { Breadcrumb } from "antd";
import React from "react";

type Props = {};

export default function TransactionPage({}: Props) {
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
							title: "จัดการใบงาน",
						},
					]}
				/>
			</header>

			<div>
				<TransactionComponent />
			</div>
		</section>
	);
}
