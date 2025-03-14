"use client";

import { BG_COLORS, DONT_SHOW_SPINNER_IN_THIS_PAGES } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { validate } from "uuid";
import { useShallow } from "zustand/react/shallow";

export default function Spinner({
  bgColorRoute = "default",
  variant = "default",
}) {
  const pathname = usePathname();
  const [bgColor, setBgColor] = useState(null); // State to store the background color
  const [isClient, setIsClient] = useState(false); // Track if the component is rendered on the client side
  const { showSpinner } = useTaskStore(
    useShallow((state) => ({
      showSpinner: state.showSpinner,
    })),
  );

  // This ensures the background color is calculated on the client side after mount to prevent hydratation error
  useEffect(() => {
    const pageName = pathname.split("/").at(-1);
    const isUUID = validate(pageName);
    setBgColor(
      BG_COLORS[isUUID ? "/slug" : `/${pageName}`] ||
        BG_COLORS[`/${bgColorRoute}`],
    );
    setIsClient(true); // Mark the component as client-side rendered
  }, [pathname, bgColorRoute]);

  // Wait until the component is rendered on the client side
  if (!isClient || !bgColor) return null;

  // Always render the default spinner unless variant="transparent" is explicitly set
  const shouldRenderDefault = variant !== "transparent";
  const shouldRenderTransparent = variant === "transparent" && showSpinner;

  // If the pathname is in the list, do not render the component and exit
  if (
    shouldRenderTransparent &&
    DONT_SHOW_SPINNER_IN_THIS_PAGES.includes(pathname)
  ) {
    return null;
  }

  const ballStyle = { backgroundColor: bgColor.primaryText };

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
