import { MagnifierIcon, XIcon } from "@/public/icons/icons";
import { useRouter } from "next/navigation";

const { useState, useEffect } = require("react");

export default function TaskSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchInput) {
      router.push(
        `/tasks/search?query=${encodeURIComponent(searchInput)}`,
        undefined,
        { shallow: true },
      );
    }
  }, [searchInput, router]);

  function handleFocus() {
    setIsTyping(true);
  }

  function handleBlur() {
    setIsTyping(false);
  }

  function handleClearInputs(e) {
    e.preventDefault();
    setSearchInput("");
  }

  return (
    <div
      className="border-1 z-10 mb-3 h-[2.2rem] w-full overflow-hidden rounded-md border border-b-[2px] border-gray-200"
      style={{
        borderBottom: isTyping ? "2.5px solid #2563EB" : "2.5px solid #d1d5db",
      }}
    >
      <form className="relative flex h-full w-full items-center">
        <div className="absolute right-2 flex items-center gap-1">
          {searchInput && (
            <button
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md p-0.5 hover:bg-gray-100"
              onClick={handleClearInputs}
            >
              <XIcon />
            </button>
          )}

          {!isTyping && !searchInput && (
            <span className="flex h-5 w-5 items-center justify-center">
              <MagnifierIcon />
            </span>
          )}
        </div>

        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          spellCheck={false}
          className={`h-full w-full p-2 pl-4 pr-14 text-sm font-light placeholder-gray-500 outline-none ${
            isTyping ? "" : ""
          }`}
          style={{ minWidth: "0", flex: 1 }}
        />
      </form>
    </div>
  );
}
