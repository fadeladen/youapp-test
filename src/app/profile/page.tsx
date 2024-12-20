"use client";
import { getUserProfile } from "@/service/UserService";
import { useEffect, useState } from "react";
import About from "./components/About";
import Interest from "./components/Interest";
import Header from "@/components/Header";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export type UserType = {
  username: string;
  email: string;
  name: string;
  birthday: string;
  height: number | string;
  weight: number | string;
  interests: Array<string>;
  horoscope?: string;
  zodiac?: string;
};

export default function Profile() {
  const img = Cookies.get("profileImage");
  const [imageUrl, setImageUrl] = useState<string>(img || "");
  const [userData, setUserData] = useState<UserType>({
    username: "",
    email: "",
    name: "",
    birthday: "",
    height: 0,
    weight: 0,
    interests: [],
    horoscope: "",
    zodiac: "",
  });
  const getUserData = async () => {
    try {
      const response = await getUserProfile();
      setUserData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("profileImage");
    redirect("/auth/login");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 px-4 py-2">
      <Header
        onBack={onLogOut}
        title={"@" + userData?.username}
      />
      <div className={"w-full relative rounded-xl h-36 flex bg-[#162329]"}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="profile-img"
            className="object-cover w-full h-full rounded-xl"
          />
        )}
        <div className="absolute bottom-3 left-3">@{userData?.username}</div>
      </div>
      <About
        setImageUrl={setImageUrl}
        userData={userData}
        getUserData={getUserData}
      />
      <Interest userData={userData} />
    </div>
  );
}
