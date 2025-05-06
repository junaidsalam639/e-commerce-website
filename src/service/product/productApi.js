import { ecommerceApi } from "../../redux/createApi"

const productApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        product: builder.query({
            query: () => "/products",
        }),
        productSingle: builder.query({
            query: (id) => `/products/${id}`,
        }),
    }),
});

export const { useProductQuery, useProductSingleQuery } = productApi;
