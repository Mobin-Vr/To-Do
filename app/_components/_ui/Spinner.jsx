"use client";

import { BG_COLORS } from "@/app/_lib/configs";
import { usePathname } from "next/navigation";
import { validate } from "uuid";

export default function Spinner({ defaultBgColor }) {
  const pageName = usePathname().split("/").at(-1);
  const isUUID = validate(pageName);
  const bgColor = BG_COLORS[isUUID ? "/slug" : `/${pageName}`];

  const ballStyle = {
    backgroundColor: defaultBgColor
      ? defaultBgColor.primaryText
      : bgColor.primaryText,
  };

  const spinnerBgStyle = {
    backgroundColor: defaultBgColor
      ? defaultBgColor.mainBackground
      : bgColor.mainBackground,
  };

  return (
    <div className="fixed inset-0 h-full w-full" style={spinnerBgStyle}>
      <div className="spinner">
        <div className="bounce1" style={ballStyle}></div>
        <div className="bounce2" style={ballStyle}></div>
        <div className="bounce3" style={ballStyle}></div>
      </div>
    </div>
  );
}
