export default function Step({ className }) {
   return (
      <div className={`${className}`}>
         <button className='text-xs text-blue-500 flex gap-3 items-center w-full'>
            <span className='text-lg'>+</span>
            <span className='py-2 rounded-sm w-full text-start hover:bg-accent-50'>
               Add Step
            </span>
         </button>
      </div>
   );
}
