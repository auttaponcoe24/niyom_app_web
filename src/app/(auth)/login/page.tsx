"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input, notification } from "antd";

import Link from "next/link";
import { useSignIn } from "@/src/hooks/useAuth";

interface LoginForm {
	emailOrCardId: string;
	password: string;
}

type Props = {};

export default function LoginPage({}: Props) {
	const router = useRouter();

	const [form] = Form.useForm<LoginForm>();

	const [rememberMe, setRememberMe] = useState(false);

	const { mutate: signIn, isPending: isPendingSignIn } = useSignIn();

	useEffect(() => {
		const savedEmail = localStorage.getItem("rememberedEmail");
		if (savedEmail) {
			form.setFieldsValue({ emailOrCardId: savedEmail });
			setRememberMe(true);
		}
	}, [form]);

	const handleOnSubmit = async (values: LoginForm) => {
		if (values.emailOrCardId) {
			localStorage.setItem("rememberedEmail", values.emailOrCardId);
		} else {
			localStorage.removeItem("rememberedEmail");
		}

		signIn(values, {
			onSuccess: (success) => {
				if (success) {
					notification.success({
						message: "Login Successfully",
					});
					localStorage.setItem("user", JSON.stringify(success));
					localStorage.setItem("accessToken", success.accessToken);
					router.push("/main");
				} else {
					notification.error({
						message: "Login Failed",
					});
				}
			},
			onError: () => {
				notification.error({
					message: "Login Failed",
				});
			},
		});
	};

	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-900">
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
				<p className="pb-4 text-left text-3xl font-semibold text-white">
					Log In
					<span aria-label="emoji" className="ml-2" role="img">
						👋
					</span>
				</p>
				<Form
					layout="vertical"
					className="flex flex-col gap-4"
					form={form}
					onFinish={handleOnSubmit}
				>
					<Form.Item
						name={`emailOrCardId`}
						label={<div className="text-white">Email</div>}
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder="Enter your email" />
					</Form.Item>
					<Form.Item
						name={`password`}
						label={<div className="text-white">Password</div>}
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input.Password placeholder="Enter your password" />
					</Form.Item>

					<div className="flex w-full items-center justify-between px-1 py-2">
						<Checkbox
							name="remember"
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
						>
							<div className="text-white">Remember me</div>
						</Checkbox>
						<Link className="text-default-500" href="#">
							Forgot password?
						</Link>
					</div>
					<Button
						className="w-full"
						type="primary"
						htmlType="submit"
						loading={isPendingSignIn}
					>
						Log In
					</Button>
				</Form>
				<p className="text-center text-small">
					<Link className="no-underline text-blue-600" href="#">
						Create an account
					</Link>
				</p>
			</div>
		</div>
	);
}
