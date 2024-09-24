"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TSignIn } from "@/src/interfaces/auth.interface";
import toast, { Toaster } from "react-hot-toast";
import { RootState, useAppDispatch } from "@/src/store/store";
import { useSelector } from "react-redux";
import { signIn } from "@/src/store/slices/userSlice";
import { Button, Form, Input, Spin, Typography } from "antd";

type Props = {};

export default function LoginPage({}: Props) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isLoading: isLoadingUser, isAuthenticated } = useSelector(
		(state: RootState) => state.userSlice
	);

	const [form] = Form.useForm();

	const handleOnSubmit = async (values: TSignIn) => {
		// console.log("values=>", values);

		const result = await dispatch(signIn(values));

		if (signIn.fulfilled.match(result)) {
			if (result?.payload?.message === "no") {
				// toast.error("เข้าสู่ระบบ ไม่สำเร็จ");
			} else {
				// toast.success("เข้าสู่ระบบ สำเร็จ");
				router.push("/main");
			}
		} else if (signIn.rejected.match(result)) {
			toast.error("เข้าสู่ระบบ ไม่สำเร็จ");
		}
	};

	return (
		<>
			{isLoadingUser ? (
				<div>
					<Spin size="large" />
				</div>
			) : (
				<div className="">
					<div className="max-w-[345px] w-[300px] bg-white/80 rounded-lg shadow-lg p-6">
						<Typography.Title level={2} className="uppercase">
							Sign In
						</Typography.Title>
						<Form form={form} onFinish={handleOnSubmit}>
							<Form.Item
								name={`email`}
								// label="อีเมล์"
								rules={[
									{
										required: true,
										message: "กรุณาป้อนอีเมล์",
									},
								]}
							>
								<Input placeholder="อีเมล์" size="large" />
							</Form.Item>
							<Form.Item
								name={"password"}
								// label="รหัสผ่าน"
								rules={[
									{
										required: true,
										message: "กรุณาป้อนรหัสผ่าน",
									},
								]}
							>
								<Input.Password placeholder="รหัสผ่าน" size="large" />
							</Form.Item>

							<div className="flex flex-col gap-2">
								<Button type="primary" htmlType="submit" size="large">
									เข้าสู่ระบบ
								</Button>
								<Button
									type="default"
									size="large"
									onClick={() => {
										router.push("/register");
									}}
								>
									สร้างบัญชี
								</Button>
							</div>
						</Form>
					</div>

					<style jsx global>{`
						body {
							height: 100vh;
							margin: 0;
							background-size: cover;
							background-image: url("/images/pages/bgAuth1.jpg");
							text-align: center;
							backdrop-filter: blur(4px);
							display: flex;
							align-items: center;
							justify-content: center;
							color: white;
							position: relative;
						}

						body::before {
							content: "";
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							background: linear-gradient(
								to bottom,
								rgba(0, 0, 0, 0.5),
								rgba(0, 0, 0, 0.5)
							);
							z-index: -1;
						}
					`}</style>
				</div>
			)}
		</>
	);
}
