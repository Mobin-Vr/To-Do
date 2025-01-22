export default function CancelSaveBtn({ hanldeCancel, hanldeSave }) {
   return (
      <div className='flex gap-1 px-1 mb-1'>
         <button
            onClick={hanldeCancel}
            className='w-full py-0.5 bg-gray-300 text-base font-light text-black rounded-sm'
         >
            Cancel
         </button>

         <button
            onClick={hanldeSave}
            className='w-full py-0.5 bg-blue-700 text-base font-light text-white rounded-sm '
         >
            Save
         </button>
      </div>
   );
}
