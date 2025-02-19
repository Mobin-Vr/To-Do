export default function OrdinaryBtn({
  text,
  onClick,
  className,
  mode,
  children,
  disabled,
  title = "",
}) {
  const btnColor = {
    primary: `text-black bg-white border border-gray-200 hover:bg-gray-100`,
    secondary: `text-white bg-blue-600 border border-gray-200 hover:bg-blue-700`,
    warn: `text-white bg-red-600 border border-gray-200 hover:bg-red-700`,
    toast: `text-xs bg-gray-300 text-black border hover:bg-gray-700 hover:text-white hover:border hover:border-gray-500 `,

    reversePrimary: `text-black bg-white border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white`,
    reverseSecondary: `text-blue-600 bg-white border-2 border-gray-00 hover:border-blue-600 hover:bg-blue-700 hover:text-white`,
  };

  return (
    <button
      disabled={disabled}
      title={title}
      onClick={onClick}
      className={`flex items-center justify-center gap-1 rounded-md px-3.5 py-1 transition-all duration-300 ${
        btnColor[mode]
      } ${className} ${
        disabled
          ? "cursor-not-allowed border border-gray-200 bg-gray-300 hover:bg-gray-300"
          : ""
      }`}
    >
      {children}
      {text}
    </button>
  );
}
