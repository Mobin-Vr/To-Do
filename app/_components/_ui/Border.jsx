function Border({ className }) {
   return (
      <span
         className={`h-[1px] w-[92%] transform bg-gray-200 m-auto my-0.5 -translate-y-[10%] ${className}`}
      ></span>
   );
}

export default Border;
