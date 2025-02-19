import { useState } from "react";
import { ArrowIcon } from "@/public/icons";

export default function ListToggler({
  isVisible,
  completedCount,
  onClick,
  bgColor,
  TogglerName,
}) {
  const [bg, setBg] = useState(bgColor.toggleBackground);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setBg(bgColor.toggleHover)}
      onMouseLeave={() => setBg(bgColor.toggleBackground)}
      className="my-2 flex h-8 w-fit cursor-pointer select-none items-center gap-1 rounded-md p-2 text-sm font-normal transition-colors duration-200"
      style={{
        backgroundColor: bg,
        color: bgColor.toggleText,
      }}
    >
      <span
        className={`flex items-center transition-transform duration-300 ${
          isVisible ? "rotate-90" : ""
        }`}
      >
        <ArrowIcon color={bgColor.toggleText} />
      </span>
      <p>{TogglerName}</p>
      <span className="ml-1">{completedCount}</span>
    </div>
  );
}
