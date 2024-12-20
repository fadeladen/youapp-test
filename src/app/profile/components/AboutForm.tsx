import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UserType } from "../page";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { updateUserProfile } from "@/service/UserService";
import { horosopeData, zodiacSigns } from "../data";
import PlusSvg from "@/assets/svg/PlusSvg";
import Cookies from "js-cookie";
dayjs.extend(isBetween);
export type AboutFormType = {
  name: string;
  height: string;
  weight: string;
  horoscope?: string;
  zodiac?: string;
  birthday: string;
};

const schema = yup.object().shape({
  name: yup.string().required("this field is required"),
  height: yup.string().required("this field is required"),
  weight: yup.string().required("this field is required"),
  horoscope: yup.string(),
  zodiac: yup.string(),
  birthday: yup.string().required("this field is required"),
});

const AboutForm = ({
  userData,
  setIsEditing,
  getUserData,
  setImageUrl,
}: {
  userData: UserType;
  setIsEditing: (val: boolean) => void;
  getUserData: () => void;
  setImageUrl: (url: string) => void;
}) => {
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AboutFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userData?.name || "",
      birthday: userData?.birthday
        ? (dayjs(userData?.birthday).format("YYYY-MM-DD") as any)
        : "",
      horoscope: userData?.horoscope || "",
      zodiac: userData?.zodiac || "",
      height: userData?.height || ("" as any),
      weight: userData?.weight || ("" as any),
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef?.current?.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImageUrl(base64Image);
        Cookies.set("profileImage", base64Image, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: AboutFormType) {
    try {
      await updateUserProfile({
        ...data,
        weight: Number(data?.weight),
        height: Number(data?.height),
        username: userData?.username,
        email: userData?.email,
        interests: userData?.interests,
      });
      getUserData();
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
    }
  }

  const getZodiacSign = (dateString: string) => {
    setValue("zodiac", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    const inputDate = dayjs(dateString, "YYYY-MM-DD");
    const formattedDate = inputDate.format("MM-DD");

    for (const zodiac of zodiacSigns) {
      if (zodiac.sign === "Capricorn" && formattedDate >= "12-22") {
        return "Capricorn";
      }
      if (zodiac.sign === "Capricorn" && formattedDate <= "01-19") {
        return "Capricorn";
      }

      if (formattedDate >= zodiac.start && formattedDate <= zodiac.end) {
        setValue("zodiac", zodiac.sign, {
          shouldValidate: true,
          shouldDirty: true,
        });
        return;
      }
    }
  };

  const getHoroscopeByBirthdate = (birthdate: string) => {
    setValue("horoscope", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    const birthDay = dayjs(birthdate, "YYYY-MM-DD");
    for (const item of horosopeData) {
      const startDate = dayjs(item.start_date, "YYYY MMMM D");
      const endDate = dayjs(item.end_date, "YYYY MMMM D");
      if (birthDay.isBetween(startDate, endDate, null, "[]")) {
        setValue("horoscope", item.result, {
          shouldValidate: true,
          shouldDirty: true,
        });
        return;
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>About</div>
        <button
          type="submit"
          form="about-form"
          className="text-[#FFE2BE] text-xs"
        >
          {isSubmitting ? "Saving data..." : "Save & Update"}
        </button>
      </div>
      <form
        id="about-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8"
      >
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <button
                className="w-12 h-12 flex justify-center items-center p-5 rounded-xl bg-gray-300/[.06]"
                type="button"
                onClick={handleFileUploadClick}
              >
                <PlusSvg />
              </button>
              <div className="text-xs">Add image</div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div>
            <Input
              placeholder="Enter name"
              name="name"
              type="text"
              inline={true}
              label="Display Name"
              value={getValues("name")}
              onChange={(e) =>
                setValue("name", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.name?.message}
            />
          </div>
          <div>
            <Input
              placeholder="DD/MM/YYYY"
              name="birthday"
              type="date"
              inline={true}
              label="Birthday"
              value={getValues("birthday")}
              onChange={(e) => {
                setValue("birthday", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                getZodiacSign(e);
                getHoroscopeByBirthdate(e);
              }}
              error={errors?.birthday?.message}
            />
          </div>
          <div>
            <Input
              placeholder="Enter height"
              name="height"
              type="number"
              inline={true}
              label="Height"
              value={getValues("height")}
              onChange={(e) =>
                setValue("height", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.height?.message}
            />
          </div>
          <div>
            <Input
              placeholder="Enter weight"
              name="weight"
              type="number"
              inline={true}
              label="Weight"
              value={getValues("weight")}
              onChange={(e) =>
                setValue("weight", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.weight?.message}
            />
          </div>
          <div>
            <Input
              placeholder="--"
              name="zodiac"
              type="text"
              inline={true}
              label="Zodiac"
              disabled={true}
              value={getValues("zodiac")}
              onChange={(e) =>
                setValue("zodiac", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.zodiac?.message}
            />
          </div>
          <div>
            <Input
              placeholder="--"
              name="horoscope"
              type="text"
              inline={true}
              label="Horoscope"
              disabled={true}
              value={getValues("horoscope")}
              onChange={(e) =>
                setValue("horoscope", e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors?.horoscope?.message}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AboutForm;
