import {
  BellIcon,
  CalendarIcon,
  PaperClipIcon,
  SunIcon,
  SyncIcon,
  XIcon,
} from "@/public/icons/icons";

const iconsMap = {
  BellIcon,
  SunIcon,
  CalendarIcon,
  SyncIcon,
  PaperClipIcon,
};

export default function BoxBtn({
  text,
  activeText,
  icon,
  disabled = false,
  toggleModal,
  weekday,
  isDateSet,
  clearDate,
}) {
  const Icon = iconsMap[icon];

  return (
    <div className="relative flex items-center justify-between">
      <button
        disabled={disabled}
        onClick={toggleModal}
        className={`flex w-full items-center gap-4 px-3 ${
          disabled ? "cursor-not-allowed opacity-50" : "hover:bg-sidebar-hover"
        }`}
      >
        {Icon && (
          <span
            className={` ${isDateSet ? "text-blue-600 opacity-100" : "opacity-60"}`}
          >
            <Icon />
          </span>
        )}
        <div className="mt-1 flex h-10 flex-col justify-center leading-tight">
          <span
            className={`${isDateSet ? "text-blue-700 opacity-100" : "opacity-80"} capitalize`}
          >
            {isDateSet ? activeText : text}
          </span>
          {isDateSet && (
            <span className="text-start text-xs capitalize text-gray-500">
              {weekday}
            </span>
          )}
        </div>
      </button>

      {isDateSet && !disabled && (
        <button
          onClick={clearDate}
          className="flex aspect-square h-full items-center justify-center rounded-md p-3 transition-all duration-300 hover:bg-sidebar-hover"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}
