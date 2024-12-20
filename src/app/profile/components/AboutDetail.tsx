import EditSvg from "@/assets/svg/EditSvg";
import React from "react";
import { UserType } from "../page";
import dayjs from "dayjs";

const AboutDetail = ({
  userData,
  onEdit,
}: {
  userData: UserType;
  onEdit: () => void;
}) => {
  const calculateAge = (birthDate: string) => {
    const today = dayjs();
    const birth = dayjs(birthDate);
    const age = today.diff(birth, "year");

    return age;
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>About</div>
        <div onClick={onEdit}>
          <EditSvg />
        </div>
      </div>
      {!userData?.name ? (
        <div className="text-sm mt-12 opacity-50">
          Add in your your to help others know you better
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex items-center gap-1">
            <div className="text-white/50">Birthday:</div>
            <div>
              {userData?.birthday
                ? dayjs(userData?.birthday).format("DD / MM / YYYY")
                : ""}{" "}
              (Age {calculateAge(userData?.birthday)})
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-white/50">Horoscope:</div>
            <div>{userData?.horoscope}</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-white/50">Zodiac:</div>
            <div>{userData?.zodiac}</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-white/50">Height:</div>
            <div>{userData?.height} cm</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-white/50">Weight:</div>
            <div>{userData?.weight} kg</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutDetail;
