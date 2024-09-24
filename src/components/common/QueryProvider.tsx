"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
	children: ReactNode;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false, // ปิดการ retry ถ้าไม่ต้องการให้มีการเรียกใหม่เมื่อเกิดข้อผิดพลาด
			refetchOnWindowFocus: false, // ปิดการ refetch เมื่อหน้าต่างกลับมาเป็น focus
			refetchOnReconnect: false, // ปิดการ refetch เมื่อ reconnect
		},
	},
});

export default function QueryProvider({ children }: Props) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
