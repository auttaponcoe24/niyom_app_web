"use client";

import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	InputAdornment,
	styled,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Icons from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { User } from "@/src/interfaces/auth.interface";
import { useGetSignIn } from "@/src/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

type SignIn = {
	email: string;
	password: string;
};

export default function LoginPage({}: Props) {
	const router = useRouter();

	const {
		mutate: mutateSignIn,
		isPending: isPendingSignIn,
		data: dataSignIn,
	} = useGetSignIn();

	// console.log("dataSignIn", dataSignIn);

	const initialValue: SignIn = {
		email: "@gmail.com",
		password: "",
	};

	const formValidateSchema = Yup.object().shape({
		email: Yup.string().required("Username is required").trim(),
		password: Yup.string().required("Password is required").trim(),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		defaultValues: initialValue,
		resolver: yupResolver(formValidateSchema),
	});

	const handleOnSubmit = async (values: SignIn) => {
		// console.log(values);

		const onSuccess = () => {
			toast.success("LOGIN ACCESS SUCCESS");
			router.push("/");
		};

		const onError = () => {
			toast.error("LOGIN ACCESS FAIL");
		};

		mutateSignIn(values, {
			onSuccess,
			onError,
		});
	};

	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			{isPendingSignIn ? (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}
				>
					<CircularProgress size={80} />
				</Box>
			) : (
				<Box className="flex justify-center items-center h-screen">
					<Card className="max-w-[345px] mt-10" elevation={3}>
						<CardContent>
							<Typography variant="h4">Sign In</Typography>
						</CardContent>

						<CardContent>
							<form onSubmit={handleSubmit(handleOnSubmit)}>
								<Controller
									control={control}
									name="email"
									render={({ field }) => {
										return (
											<TextField
												{...field}
												variant="outlined"
												margin="normal"
												fullWidth
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<Icons.Email />
														</InputAdornment>
													),
												}}
												label="เข้าสู่ระบบ"
												autoComplete="email"
												autoFocus
											/>
										);
									}}
								/>

								<Controller
									control={control}
									name="password"
									render={({ field }) => (
										<TextField
											{...field}
											variant="outlined"
											margin="normal"
											fullWidth
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<Icons.Password />
													</InputAdornment>
												),
											}}
											label="รหัสผ่าน"
											autoComplete="password"
											autoFocus
											type="password"
										/>
									)}
								/>

								<div className="flex flex-col items-center justify-center gap-2 mt-2">
									<Button
										fullWidth
										variant="contained"
										type="submit"
										color="primary"
									>
										<Typography variant="button">Sign In</Typography>
									</Button>
									<Button
										fullWidth
										variant="outlined"
										type="button"
										onClick={() => router.push("/register")}
									>
										<Typography variant="button">Register</Typography>
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>

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
				</Box>
			)}
		</>
	);
}
