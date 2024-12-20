import { LoginFormType } from "@/app/auth/login/page";
import { BaseService } from "./AxiosService";
import { RegisterFormType } from "@/app/auth/register/page";

export async function apiSignIn(data: LoginFormType) {
  return BaseService({
    url: "/login",
    method: "post",
    data,
  });
}

export async function apiRegister(data: RegisterFormType) {
    return BaseService({
      url: "/register",
      method: "post",
      data,
    });
  }