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
import { TSignUp } from "@/src/interfaces/auth.interface";
import { useGetSignUp } from "@/src/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { RootState, useAppDispatch } from "@/src/store/store";
import { signUp } from "@/src/store/slices/userSlice";
import { useSelector } from "react-redux";

type Props = {};

export default function RegisterPage({}: Props) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isLoading: isLoadingUser } = useSelector(
		(state: RootState) => state.userSlice
	);

	const initialValue: TSignUp = {
		email: "@gmail.com",
		password: "",
		confirmPassword: "",
	};

	const formValidateSchema = Yup.object().shape({
		email: Yup.string().required("Username is required").trim(),
		password: Yup.string().required("Password is required").trim(),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password")])
			.required("Confirm Password is required"),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TSignUp>({
		defaultValues: initialValue,
		resolver: yupResolver(formValidateSchema),
	});

	const handleOnSubmit = async (values: TSignUp) => {
		// console.log(values);

		const onSuccess = () => {
			toast.success("สร้างบัญชี สำเร็จ");
			router.push("/login");
		};
		const onError = () => {
			toast.error("สร้างบัญชี ไม่สำเร็จ");
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
			<Toaster position="top-right" reverseOrder={false} />
			{isLoadingUser ? (
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
							<Typography variant="h4">Sign Up</Typography>
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
												label="อีเมล์ เข้าสู่ระบบ"
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

								<Controller
									control={control}
									name="confirmPassword"
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
											label="ยืนยันรหัสผ่าน"
											autoComplete="confirm_password"
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
										<Typography variant="button">Sign Up</Typography>
									</Button>
									<Button
										fullWidth
										variant="outlined"
										type="button"
										onClick={() => router.push("/login")}
									>
										<Typography variant="button">Cancel</Typography>
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
