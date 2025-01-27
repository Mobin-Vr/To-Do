import { useState } from 'react';
import InitialView from './InitialView';
import LinkCreatedView from './LinkCreatedView';
import MoreOptionsView from './MoreOptionsView';

export default function SharedListmodal({ toggleModal }) {
   const [currentView, setCurrentView] = useState('initial');
   const [isChecked, setIsChecked] = useState(false);

   const handleCreateLink = () => setCurrentView('linkCreated');
   const handleMoreOptions = () => setCurrentView('moreOptions');
   const handleBackToLinkCreated = () => setCurrentView('linkCreated');

   return (
      <div className='h-full'>
         {currentView === 'initial' && (
            <InitialView
               onCreateLink={handleCreateLink}
               toggleModal={toggleModal}
            />
         )}

         {currentView === 'linkCreated' && (
            <LinkCreatedView
               onMoreOptions={handleMoreOptions}
               toggleModal={toggleModal}
            />
         )}

         {currentView === 'moreOptions' && (
            <MoreOptionsView
               onBackToLinkCreated={handleBackToLinkCreated}
               isChecked={isChecked}
               setIsChecked={setIsChecked}
            />
         )}
      </div>
   );
}
