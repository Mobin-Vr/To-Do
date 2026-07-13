"use client";

import { BG_COLORS, DONT_SHOW_SPINNER_IN_THIS_PAGES } from "@/app/_lib/configs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { validate } from "uuid";

export default function Spinner({
  bgColorRoute = "default",
  variant = "default",
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const pageName = pathname.split("/").at(-1) || "";
  const isUUID = validate(pageName);
  const bgColor =
    BG_COLORS[isUUID ? "/slug" : `/${pageName}`] ||
    BG_COLORS[`/${bgColorRoute}`];

  if (!isClient || !bgColor) return null;

  const shouldRenderDefault = variant !== "transparent";
  const shouldRenderTransparent = variant === "transparent";

  // Don't show transparent spinner on excluded pages (like auth pages)
  if (
    shouldRenderTransparent &&
    DONT_SHOW_SPINNER_IN_THIS_PAGES.includes(pathname)
  ) {
    return null;
  }

  const ballStyle = { backgroundColor: bgColor.primaryText };

  return (
    <>
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
