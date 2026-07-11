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
  const [isClient, setIsClient] = useState(false); // Track if component has mounted on client

  // Set isClient asynchronously to avoid synchronous setState in effect (React 19)
  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Compute background color directly from pathname – no need for state
  const pageName = pathname.split("/").at(-1) || "";
  const isUUID = validate(pageName);
  const bgColor =
    BG_COLORS[isUUID ? "/slug" : `/${pageName}`] ||
    BG_COLORS[`/${bgColorRoute}`];

  // Wait until client-side render is ready
  if (!isClient || !bgColor) return null;

  // Always render the default spinner unless variant="transparent"
  const shouldRenderDefault = variant !== "transparent";
  const shouldRenderTransparent = variant === "transparent";

  // If pathname is in the exclusion list and we only need transparent spinner, bail out
  if (
    shouldRenderTransparent &&
    DONT_SHOW_SPINNER_IN_THIS_PAGES.includes(pathname)
  ) {
    return null;
  }

  const ballStyle = { backgroundColor: bgColor.primaryText };

  return (
    <>
      {/* Default Spinner */}
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

      {/* Transparent Spinner */}
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
