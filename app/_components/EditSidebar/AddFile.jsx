import { PaperClipIcon } from '@/public/icons';
import BoxTemplate from './BoxTemplate';
import DetailsBtn from './DetailsBtn';

function AddFile() {
   return (
      <BoxTemplate className='flex gap-4 items-center w-full  hover:bg-accent-50 transition-all duration-300'>
         <DetailsBtn text='Add file'>
            <PaperClipIcon size='16px' />
         </DetailsBtn>
      </BoxTemplate>
   );
}

export default AddFile;
