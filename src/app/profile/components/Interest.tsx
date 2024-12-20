import React from "react";
import { UserType } from "../page";
import Link from "next/link";
import EditSvg from "@/assets/svg/EditSvg";

const Interest = ({ userData }: { userData: UserType }) => {
  return (
    <div className="min-h-[120px] bg-[#0E191F] px-5 py-3 rounded-xl">
      <div className="flex justify-between items-center">
        <div>Interest</div>
        <Link href={"/profile/interest"}>
          <EditSvg />
        </Link>
      </div>
      {userData?.interests.length === 0 ? (
        <div className="text-sm mt-12 opacity-50">
          Add in your interest to find a better match
        </div>
      ) : (
        <div className="flex items-center flex-wrap gap-2 mt-4">
            {userData?.interests?.map((interest, index) => (
                <div key={index} className="bg-[#162329] px-4 py-2 rounded-xl">
                    {interest}
                </div> 
            ))}
        </div>
      )}
    </div>
  );
};

export default Interest;
