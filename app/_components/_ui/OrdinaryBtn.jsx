export default function OrdinaryBtn({
   text,
   onClick,
   className,
   mode,
   children,
   disabled,
}) {
   const btnColor = {
      primary: `text-black bg-white border border-gray-200 hover:bg-gray-300`,
      secondary: `text-white bg-blue-600 border border-gray-200 hover:bg-blue-700`,
      warn: `text-white bg-red-600 border border-gray-200 hover:bg-red-700`,
   };

   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={`py-1.5 px-4 rounded-sm ${btnColor[mode]} ${className}`}
      >
         {text}
         {children}
      </button>
   );
}
