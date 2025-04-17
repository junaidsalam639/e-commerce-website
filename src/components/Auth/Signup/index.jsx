"use client";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { basedUrl } from "@/src/utils/basedUrl";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("phone", values.phone);
        const res = await fetch(`${basedUrl}/signup`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res?.ok) {
          toast("Account created successfully!");
          resetForm();
          router.push("/signin");
          setLoading(false);
        } else {
          toast(data.error || "Something went wrong");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        toast("Server error");
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Breadcrumb title={"Signup"} pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account
              </h2>
              <p>Enter your details below</p>
            </div>

            <form onSubmit={formik?.handleSubmit}>
              {["name", "email", "password", "phone"]?.map((field) => (
                <div className="mb-5" key={field}>
                  <label htmlFor={field} className="block mb-2.5 capitalize">
                    {field} <span className="text-red">*</span>
                  </label>
                  <input
                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                    name={field}
                    id={field}
                    placeholder={`Enter your ${field}`}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values[field]}
                    className={`rounded-lg border ${formik?.touched[field] && formik?.errors[field] ? "border-red-500" : "border-gray-3"
                      } bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
                  />
                  {formik?.touched[field] && formik?.errors[field] && (
                    <div className="text-red-500 text-sm mt-1">{formik?.errors[field]}</div>
                  )}
                </div>
              ))}

              <Button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Account
              </Button>

              <p className="text-center mt-6">
                Already have an account?
                <Link href="/signin" className="text-dark ease-out duration-200 hover:text-blue pl-2">
                  Sign in Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
