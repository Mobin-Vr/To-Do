import { TrashIcon } from "@/public/icons/icons";
import { useState } from "react";

export default function DeleteBtn({
  onClick,
  className,
  bgColor,
  useDefaultStyle = true,
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex items-center justify-center rounded-md p-1 ${className}`}
      style={{
        ...(useDefaultStyle && {
          backgroundColor: hover ? bgColor.buttonHover : "",
        }),
      }}
    >
      <TrashIcon />
    </button>
  );
}
