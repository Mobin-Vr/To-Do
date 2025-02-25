"use client";

import { BG_COLORS } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import { usePathname } from "next/navigation";
import { validate } from "uuid";
import { useShallow } from "zustand/react/shallow";

export default function Spinner({
  bgColorRoute = "default",
  variant = "default",
}) {
  const { showSpinner } = useTaskStore(
    useShallow((state) => ({
      showSpinner: state.showSpinner,
    })),
  );

  const pageName = usePathname().split("/").at(-1);
  const isUUID = validate(pageName);
  const bgColor =
    BG_COLORS[isUUID ? "/slug" : `/${pageName}`] ||
    BG_COLORS[`/${bgColorRoute}`];

  const ballStyle = { backgroundColor: bgColor.primaryText };

  // Always render the default spinner unless variant="transparent" is explicitly set
  const shouldRenderDefault = variant !== "transparent";
  const shouldRenderTransparent = variant === "transparent" && showSpinner;

  return (
    <>
      {/* Default Spinner (always rendered unless variant="transparent") */}
      {shouldRenderDefault && (
        <div
          className="fixed inset-0 h-full w-full"
          style={{ backgroundColor: bgColor.mainBackground }}
        >
          <div className="spinner bg-transparent">
            <div className="bounce1" style={ballStyle}></div>
            <div className="bounce2" style={ballStyle}></div>
            <div className="bounce3" style={ballStyle}></div>
          </div>
        </div>
      )}

      {/* Transparent Spinner (renders only when showSpinner is true and variant is "transparent") */}
      {shouldRenderTransparent && (
        <div className="spinner bg-transparent">
          <div className="bounce1" style={ballStyle}></div>
          <div className="bounce2" style={ballStyle}></div>
          <div className="bounce3" style={ballStyle}></div>
        </div>
      )}
    </>
  );
}
