import { ecommerceApi } from "../../redux/createApi"

const categoryApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        category: builder.query({
            query: () => "/categories",
        }),
    }),
});

export const { useCategoryQuery } = categoryApi;