"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { apiRegister } from "@/service/AuthService";
import { useState } from "react";

const registerSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});
export type RegisterFormType = yup.InferType<typeof registerSchema>;

export default function Register() {
  const [message, setMessage] = useState<string>("");
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      password_confirmation: "",
      email: "",
    },
  });

  async function onSubmit(data: RegisterFormType) {
    try {
      const response = await apiRegister(data);
      setMessage(response?.message);
      reset({
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
      });
    } catch (error: any) {
      console.error("eeeeee:", error);
      setMessage(error?.message || "something went wrong");
    }
  }

  return (
    <main className="flex flex-col pt-20 px-5">
      <h1 className="text-2xl font-bold mb-4 text-white">Register</h1>
      {message && <p className="my-2">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-5">
          <div>
            <Input
              placeholder="Enter Email"
              name="email"
              type="text"
              value={getValues("email")}
              onChange={(e) =>
                setValue("email", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.email?.message}
            />
          </div>
          <div>
            <Input
              placeholder="Create Username"
              name="username"
              type="text"
              value={getValues("username")}
              onChange={(e) =>
                setValue("username", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.username?.message}
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              value={getValues("password")}
              placeholder="Create Password"
              onChange={(e) =>
                setValue("password", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.password?.message}
            />
          </div>
          <div>
            <Input
              name="password_confirmation"
              type="password"
              value={getValues("password_confirmation")}
              placeholder="Confirm Password"
              onChange={(e) =>
                setValue("password_confirmation", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.password_confirmation?.message}
            />
          </div>
        </div>
        <Button
          classname="btn-auth"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Register
        </Button>
      </form>
      <div className="mt-12 text-sm text-center">
        <p>
          Have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-[#FFE2BE] underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
