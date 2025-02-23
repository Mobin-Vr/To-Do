"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListToggler from "../ListToggler";
import TaskGroup from "../TaskGroup";

export default function TasksMinimizer({
  tasks,
  bgColor,
  listRef,
  TogglerName,
  isVisibleByDefault = false,
  listName,
  isShown = true,
}) {
  const [isVisible, setVisible] = useState(isVisibleByDefault);

  return (
    <>
      {isShown && (
        <ListToggler
          TogglerName={TogglerName}
          isVisible={isVisible}
          Count={tasks.length}
          onClick={() => setVisible(!isVisible)}
          bgColor={bgColor}
        />
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <TaskGroup
              tasks={tasks}
              listRef={listRef}
              bgColor={bgColor}
              listName={listName}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
