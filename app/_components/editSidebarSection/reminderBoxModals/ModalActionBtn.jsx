export function ModalActionButton({
  icon,
  label,
  time,
  className,
  onClick,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 px-4 py-3 ${className} ${
        disabled ? "cursor-default" : "hover:bg-accent-50"
      }`}
    >
      <div className="flex items-center justify-center gap-3">
        {icon}
        <h4 className={`${disabled ? "text-gray-300" : ""}`}>{label}</h4>
      </div>

      {time && <span>{time}</span>}
    </button>
  );
}
