import BoxBtn from './BoxBtn';
import BoxTemplate from './BoxTemplate';

function AddCategory() {
   return (
      <BoxTemplate>
         <BoxBtn
            text='Add to My Day'
            activeText='Added to My Day'
            icon='SunIcon'
            size='18px'
         />
      </BoxTemplate>
   );
}

export default AddCategory;
