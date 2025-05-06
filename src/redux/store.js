import { configureStore } from "@reduxjs/toolkit";
import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import { useSelector } from "react-redux";
import { ecommerceApi } from "./createApi";

export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
    [ecommerceApi.reducerPath]: ecommerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ecommerceApi.middleware),
});

export const useAppSelector = useSelector;
