import OrdinaryBtn from './OrdinaryBtn';

export default function CancelSaveBtn({ hanldeCancel, hanldeSave }) {
   return (
      <div className='flex gap-1 px-1 mb-1'>
         <OrdinaryBtn
            onClick={hanldeCancel}
            text='Cancel'
            mode='primary'
            className='w-full'
         />

         <OrdinaryBtn
            onClick={hanldeSave}
            text='Save'
            mode='secondary'
            className='w-full'
         />
      </div>
   );
}
