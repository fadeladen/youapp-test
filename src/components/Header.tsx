import BackSvg from "@/assets/svg/BackSvg";
import React from "react";

type Props = {
  title?: string;
  onBack: () => void;
  rightText?: string;
  onRightTextClick?: () => Promise<void>;
};

const Header = (props: Props) => {
  const { title = "", onBack, rightText = "", onRightTextClick } = props;
  return (
    <div className="flex justify-between items-center pr-2 pt-2">
      <div
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <div>
          <BackSvg />
        </div>
        <p>Back</p>
      </div>
      <div className="text-center">{title}</div>
      <div
        className="text-right min-w-6"
        onClick={onRightTextClick}
      >
        {rightText}
      </div>
    </div>
  );
};

export default Header;
