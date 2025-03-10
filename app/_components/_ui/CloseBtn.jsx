import { XIcon } from "@/public/icons/icons";
import { useRef } from "react";

export default function CloseBtn({ toggleEditSidebar }) {
  const closeRef = useRef(null);

  function handleClose() {
    toggleEditSidebar();
  }

  return (
    <div className="flex w-full justify-end">
      <button ref={closeRef} onClick={handleClose} className="px-3 py-3 pb-4">
        <XIcon size="20" />
      </button>
    </div>
  );
}
