import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import goodsSlice from './goods/goodsSlice';
import commentsSlice from "./comments/commentsSlice";

const store = configureStore({
    reducer: { authSlice, goodsSlice, commentsSlice }
});

export default store;