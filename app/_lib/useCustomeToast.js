import { toast } from "react-hot-toast";
import { useCallback } from "react";

export default function useCustomToast() {
  const showToast = useCallback((message, icon = "") => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto flex w-fit max-w-md items-center gap-2 rounded-md px-4 py-2 font-normal shadow-lg ring-1 ring-gray-600 ring-opacity-10`}
        style={{
          background: "#dfedf7",
        }}
      >
        <span className="mt-1">{icon}</span>
        <p className="mt-1 text-sm text-blue-700">{message}</p>
      </div>
    ));
  }, []);

  return showToast;
}
