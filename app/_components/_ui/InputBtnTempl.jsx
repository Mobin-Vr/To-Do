function InputBtnTempl({ icon, title = '', onClick, className }) {
   function handleClick(e) {
      e.preventDefault();
      onClick();
   }
   return (
      <button
         onClick={handleClick}
         className={`flex cursor-pointer ${className}`}
      >
         <span>{icon}</span>
         {title && <span>title</span>}
      </button>
   );
}

export default InputBtnTempl;
