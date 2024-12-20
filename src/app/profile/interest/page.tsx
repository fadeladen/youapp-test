"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, updateUserProfile } from "@/service/UserService";
import dynamic from "next/dynamic";
import { UserType } from "../page";
const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    border: "none",
    backgroundColor: "rgba(217, 217, 217, 0.10)",
    borderRadius: "8px",
    borderColor: "none",
    padding: "4px 10px",
    color: "#ffff"
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: "#fff",
    color: "#333",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#e6e6e6",
    },
  }),
  multiValue: (styles: any) => ({
    ...styles,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    color: "#fff",
    borderRadius: "4px",
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: "#fff",
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: "#fff",
    ":hover": {
      backgroundColor: "#ff0000",
    },
  }),
  input: (styles: any) => ({
    ...styles,
    color: "#fffff",
  }),
};

const Interest = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserType>({
    username: "",
    email: "",
    name: "string",
    birthday: "string",
    height: 0,
    weight: 0,
    interests: [],
    horoscope: "",
    zodiac: "",
  });
  const [interests, setInterests] = useState<Array<string>>([]);
  const navigate = useRouter();
  const getUserData = async () => {
    try {
      const response = await getUserProfile();
      setUserData(response?.data);
      setInterests(
        response?.data?.interests?.map((item: string) => ({
          value: item,
          label: item,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit() {
    try {
      const newInterests = interests?.map((item: any) => item?.value);
      await updateUserProfile({
        ...userData,
        interests: newInterests,
      });
      navigate.back();
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 px-4 py-2">
      <Header
        onBack={() => router.back()}
        rightText="Save"
        onRightTextClick={onSubmit}
      />
      <div className="mt-10">
        <p className="font-bold text-[#FFE2BE]">Tell everyone about yourself</p>
        <p className="text-xl font-bold mt-3">What interest about you?</p>
      </div>
      <div className="mt-4">
        <CreatableSelect
          isMulti
          styles={customStyles}
          defaultValue={interests}
          key={interests.length}
          name="interests"
          options={userData?.interests?.map((item) => ({
            value: item,
            label: item,
          }))}
          closeMenuOnSelect={false}
          noOptionsMessage={() => "Type to add more"} 
          isClearable={false}
          onChange={(opt: any) => {
            setInterests(opt);
          }}
          className="basic-multi-select w-full"
        />
      </div>
    </div>
  );
};

export default Interest;
