import React, { useState } from "react";
import AboutDetail from "./AboutDetail";
import { UserType } from "../page";
import AboutForm from "./AboutForm";

const About = ({
  userData,
  getUserData,
  setImageUrl,
}: {
  userData: UserType;
  getUserData: () => void;
  setImageUrl: (url: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="min-h-[120px] bg-[#0E191F] px-5 py-3 rounded-xl">
      {!isEditing ? (
        <AboutDetail
          userData={userData}
          onEdit={() => setIsEditing(true)}
        />
      ) : (
        <AboutForm
          setImageUrl={setImageUrl}
          getUserData={getUserData}
          userData={userData}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default About;
