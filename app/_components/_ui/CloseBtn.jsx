import { XIcon } from "@/public/icons";
import { useRef } from "react";

export default function CloseBtn({ toggleEditSidebar }) {
  const closeRef = useRef(null);

  function handleClose() {
    toggleEditSidebar();
  }

  return (
    <div className="flex w-full justify-end">
      <button ref={closeRef} onClick={handleClose} className="p-1 pb-3">
        <XIcon />
      </button>
    </div>
  );
}
