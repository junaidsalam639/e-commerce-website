import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: {
    title: "",
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    img: "",
    images: [],
    id: 0,
    imgs: { thumbnails: [], previews: [] },
  },
};

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;
