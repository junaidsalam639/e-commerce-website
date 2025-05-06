import { ecommerceApi } from "../../redux/createApi"

const authApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (userInfo) => ({
                url: "/login",
                method: "POST",
                body: userInfo,
            }),
        }),
        signUp: builder.mutation({
            query: (userInfo) => ({
                url: "/signup",
                method: "POST",
                body: userInfo,
            }),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;

