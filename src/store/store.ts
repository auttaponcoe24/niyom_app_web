import customerSlice from "@/src/store/slices/customerSlice";
import prefixSlice from "@/src/store/slices/prefixSlice";
import userSlice from "@/src/store/slices/userSlice";
import zoneSlice from "@/src/store/slices/zoneSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const reducer = { userSlice, zoneSlice, customerSlice, prefixSlice };

export const store = configureStore({
	reducer,
	devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
