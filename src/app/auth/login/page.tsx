"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { apiSignIn } from "@/service/AuthService";
import { useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export type LoginFormType = {
  email: string;
  password: string;
  username?: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [message, setMessage] = useState<string>("");
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: LoginFormType) {
    setMessage("");
    try {
      const response = await apiSignIn({ ...data, username: data?.email });
      if (!response?.access_token) {
        setMessage(response?.message);
        return;
      }
      Cookies.set("token", response.access_token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      setTimeout(() => {
        redirect("/profile");
      }, 1000);
    } catch (error: any) {
      console.error(error);
      setMessage(error?.message);
    }
  }
  return (
    <main className="flex flex-col pt-20 px-5">
      <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
      {message && <p className="my-2">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-5">
          <div>
            <Input
              placeholder="Enter email"
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
              name="password"
              type="password"
              value={getValues("password")}
              placeholder="Enter Password"
              onChange={(e) =>
                setValue("password", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.password?.message}
            />
          </div>
        </div>
        <Button
          classname="btn-auth"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Login
        </Button>
      </form>
      <div className="mt-12 text-sm text-center">
        <p>
          No account?{" "}
          <Link
            href={"/auth/register"}
            className="text-[#FFE2BE] underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
