export function ModalActionButton({
   icon,
   label,
   time,
   disabled = false,
   className,
   onClick,
}) {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={`py-3 px-4 flex justify-between items-center gap-4 w-full ${className} ${
            disabled ? 'cursor-default' : 'hover:bg-accent-50'
         }`}
      >
         <div className='flex gap-3 items-center justify-center'>
            {icon}
            <h4 className={`${disabled ? 'text-gray-300' : ''}`}>{label}</h4>
         </div>

         {time && <span>{time}</span>}
      </button>
   );
}
