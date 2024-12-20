import { UserType } from "@/app/profile/page";
import { BaseService } from "./AxiosService";
import { AboutFormType } from "@/app/profile/components/AboutForm";

export async function getUserProfile() {
  return BaseService({
    url: "/getProfile",
    method: "get",
  });
}

export async function updateUserProfile(data: UserType) {
  return BaseService({
    url: "/updateProfile",
    method: "put",
    data,
  });
}
