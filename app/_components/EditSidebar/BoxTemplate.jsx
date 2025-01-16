function BoxTemplate({ children, className }) {
   return (
      <div
         className={`border border-1 text-sm font-light text-gray-700 border-accent-200 rounded-sm bg-slate-50 ${className}`}
      >
         {children}
      </div>
   );
}

export default BoxTemplate;
