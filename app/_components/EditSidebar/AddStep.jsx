export default function AddStep({ className }) {
   return (
      <div className={`${className}`}>
         <button className='text-xs text-blue-700 flex gap-2 items-center w-full'>
            <span className='text-lg'>+</span>
            <span className='py-2 px-1 rounded-sm w-full text-start hover:bg-accent-50'>
               Add Step
            </span>
         </button>
      </div>
   );
}
