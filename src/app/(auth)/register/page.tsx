"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TSignUp } from "@/src/interfaces/auth.interface";
import toast, { Toaster } from "react-hot-toast";
import { RootState, useAppDispatch } from "@/src/store/store";
import { signUp } from "@/src/store/slices/userSlice";
import { useSelector } from "react-redux";
import { Button, Form, Input, notification, Spin, Typography } from "antd";

type Props = {};

export default function RegisterPage({}: Props) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isLoading: isLoadingUser } = useSelector(
		(state: RootState) => state.userSlice
	);

	const [form] = Form.useForm();

	const handleOnSubmit = async (values: TSignUp) => {
		// console.log(values);
		const onSuccess = () => {
			toast.success("สร้างบัญชี สำเร็จ");
			router.push("/login");
		};
		const onError = () => {
			notification.error({
				message: "สร้างบัญชี ไม่สำเร็จ",
			});
		};

		const result = await dispatch(signUp(values));

		if (signUp.fulfilled.match(result)) {
			onSuccess();
		} else if (signUp.rejected.match(result)) {
			onError();
		}
	};

	return (
		<>
			{isLoadingUser ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}
				>
					<Spin size="large" />
				</div>
			) : (
				<div className="">
					<div className="max-w-[425px] w-[500px] bg-white/80 rounded-lg shadow-lg p-6">
						<Typography.Title level={2} className="uppercase">
							Sign Up
						</Typography.Title>
						<Form
							form={form}
							onFinish={handleOnSubmit}
							layout="vertical"
							// labelCol={{
							// 	span: 10,
							// }}
							// wrapperCol={{
							// 	span: 16,
							// }}
						>
							<Form.Item label="ชื่อ" name={`firstname`}>
								<Input placeholder="ชื่อ" size="large" />
							</Form.Item>
							<Form.Item label="นามสกุล" name={`lastname`}>
								<Input placeholder="นามสกุล" size="large" />
							</Form.Item>
							<Form.Item
								label="รหัสประจำตัวประชาชน"
								name={`card_id`}
								rules={[
									{
										required: true,
										message: "กรุณากรอก",
									},
									{
										validator: (_, value) => {
											const idCardPattern = /^\d{13}$/;
											if (!value) {
												return Promise.reject("กรุณากรอกรหัสประจำตัวประชาชน");
											} else if (!idCardPattern.test(value)) {
												return Promise.reject(
													"ระบุไม่ถูกต้อง ต้องเป็นตัวเลข 13 หลัก"
												);
											}
											return Promise.resolve();
										},
									},
								]}
							>
								<Input
									maxLength={13}
									placeholder="รหัสประจำตัวประชาชน"
									size="large"
									showCount
								/>
							</Form.Item>
							<Form.Item
								name={`email`}
								label="อีเมล์"
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
								label="รหัสผ่าน"
								rules={[
									{
										required: true,
										message: "กรุณาป้อนรหัสผ่าน",
									},
								]}
							>
								<Input.Password placeholder="รหัสผ่าน" size="large" />
							</Form.Item>
							<Form.Item
								name={"confirmPassword"}
								label="ยืนยันรหัสผ่าน"
								dependencies={["password"]} // บอกว่า validator นี้ต้องพึ่งพา password
								rules={[
									{
										required: true,
										message: "กรุณาป้อนรหัสผ่าน",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve(); // ผ่าน validation
											}
											return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน")); // ไม่ผ่าน validation
										},
									}),
								]}
							>
								<Input.Password placeholder="ยืนยันรหัสผ่าน" size="large" />
							</Form.Item>

							<div className="flex flex-col gap-2">
								<Button type="primary" htmlType="submit" size="large">
									ลงทะเบียน
								</Button>
								<Button
									type="default"
									size="large"
									onClick={() => {
										router.push("/login");
									}}
								>
									ยกเลิก
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
				// <Box className="flex justify-center items-center h-screen">
				// 	<Card className="max-w-[345px] mt-10" elevation={3}>
				// 		<CardContent>
				// 			<Typography variant="h4">Sign Up</Typography>
				// 		</CardContent>

				// 		<CardContent>
				// 			<form onSubmit={handleSubmit(handleOnSubmit)}>
				// 				<Controller
				// 					control={control}
				// 					name="email"
				// 					render={({ field }) => {
				// 						return (
				// 							<TextField
				// 								{...field}
				// 								variant="outlined"
				// 								margin="normal"
				// 								fullWidth
				// 								InputProps={{
				// 									startAdornment: (
				// 										<InputAdornment position="start">
				// 											<Icons.Email />
				// 										</InputAdornment>
				// 									),
				// 								}}
				// 								label="อีเมล์ เข้าสู่ระบบ"
				// 								autoComplete="email"
				// 								autoFocus
				// 							/>
				// 						);
				// 					}}
				// 				/>

				// 				<Controller
				// 					control={control}
				// 					name="password"
				// 					render={({ field }) => (
				// 						<TextField
				// 							{...field}
				// 							variant="outlined"
				// 							margin="normal"
				// 							fullWidth
				// 							InputProps={{
				// 								startAdornment: (
				// 									<InputAdornment position="start">
				// 										<Icons.Password />
				// 									</InputAdornment>
				// 								),
				// 							}}
				// 							label="รหัสผ่าน"
				// 							autoComplete="password"
				// 							autoFocus
				// 							type="password"
				// 						/>
				// 					)}
				// 				/>

				// 				<Controller
				// 					control={control}
				// 					name="confirmPassword"
				// 					render={({ field }) => (
				// 						<TextField
				// 							{...field}
				// 							variant="outlined"
				// 							margin="normal"
				// 							fullWidth
				// 							InputProps={{
				// 								startAdornment: (
				// 									<InputAdornment position="start">
				// 										<Icons.Password />
				// 									</InputAdornment>
				// 								),
				// 							}}
				// 							label="ยืนยันรหัสผ่าน"
				// 							autoComplete="confirm_password"
				// 							autoFocus
				// 							type="password"
				// 						/>
				// 					)}
				// 				/>

				// 				<div className="flex flex-col items-center justify-center gap-2 mt-2">
				// 					<Button
				// 						fullWidth
				// 						variant="contained"
				// 						type="submit"
				// 						color="primary"
				// 					>
				// 						<Typography variant="button">Sign Up</Typography>
				// 					</Button>
				// 					<Button
				// 						fullWidth
				// 						variant="outlined"
				// 						type="button"
				// 						onClick={() => router.push("/login")}
				// 					>
				// 						<Typography variant="button">Cancel</Typography>
				// 					</Button>
				// 				</div>
				// 			</form>
				// 		</CardContent>
				// 	</Card>

				// 	<style jsx global>{`
				// 		body {
				// 			height: 100vh;
				// 			margin: 0;
				// 			background-size: cover;
				// 			background-image: url("/images/pages/bgAuth1.jpg");
				// 			text-align: center;
				// 			backdrop-filter: blur(4px);
				// 			display: flex;
				// 			align-items: center;
				// 			justify-content: center;
				// 			color: white;
				// 			position: relative;
				// 		}

				// 		body::before {
				// 			content: "";
				// 			position: absolute;
				// 			top: 0;
				// 			left: 0;
				// 			right: 0;
				// 			bottom: 0;
				// 			background: linear-gradient(
				// 				to bottom,
				// 				rgba(0, 0, 0, 0.5),
				// 				rgba(0, 0, 0, 0.5)
				// 			);
				// 			z-index: -1;
				// 		}
				// 	`}</style>
				// </Box>
			)}
		</>
	);
}
