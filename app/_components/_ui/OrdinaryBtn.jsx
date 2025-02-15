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
      toast: `text-xs bg-gray-300 text-black border hover:bg-gray-700 hover:text-white hover:border hover:border-gray-500 `,
   };

   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={`py-1 px-3.5 rounded-sm flex gap-1 items-center justify-center transition-all duration-300 ${
            btnColor[mode]
         } ${className} ${
            disabled
               ? 'cursor-not-allowed bg-gray-300 border border-gray-200 hover:bg-gray-300'
               : ''
         }`}
      >
         {children}
         {text}
      </button>
   );
}
