'use client';

import { useState } from 'react';
import ListToggler from '../ListToggler';
import TaskGroup from '../TaskGroup';

export default function TasksMinimizer({
   tasks,
   bgColor,
   listRef,
   TogglerName,
   isVisibleByDefault = false,
   listName,
}) {
   const [isVisible, setVisible] = useState(isVisibleByDefault);
   return (
      <>
         <ListToggler
            TogglerName={TogglerName}
            isVisible={isVisible}
            Count={tasks.length}
            onClick={() => setVisible(!isVisible)}
            bgColor={bgColor}
         />

         {isVisible && (
            <TaskGroup
               tasks={tasks}
               listRef={listRef}
               bgColor={bgColor}
               listName={listName}
            />
         )}
      </>
   );
}
