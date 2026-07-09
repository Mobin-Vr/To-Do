import useTaskStore from "@/app/taskStore";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { MAX_INPUT_CAT_TITLE } from "../_lib/configs";
import autosize from "autosize";

export default function CategoryTitleEditor({ theCategory, className }) {
  const textareaRef = useRef(null);
  const isFocused = useRef(false); // Keep track of focus

  const { updateCategoryInStore, editTitleWhileCreating, toggleTitleFocus } =
    useTaskStore(
      useShallow((state) => ({
        updateCategoryInStore: state.updateCategoryInStore,
        editTitleWhileCreating: state.editTitleWhileCreating,
        toggleTitleFocus: state.toggleTitleFocus,
      })),
    );

  // State for current and previous title
  const [currentTitle, setCurrentTitle] = useState(
    theCategory?.category_title ?? "",
  );
  const [previousTitle, setPreviousTitle] = useState(
    theCategory?.category_title ?? "",
  );

  // Apply autosize on mount and when value changes
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      autosize.update(textareaRef.current);
    }
  }, [currentTitle]);

  // Sync state when theCategory prop changes, but only if not currently focused
  useEffect(() => {
    if (!isFocused.current && theCategory?.category_title !== undefined) {
      setCurrentTitle(theCategory.category_title);
      setPreviousTitle(theCategory.category_title);
    }
  }, [theCategory?.category_title]);

  // Focus only when it has just been created
  useEffect(() => {
    if (textareaRef.current && editTitleWhileCreating) {
      textareaRef.current.focus();
      toggleTitleFocus(false);
    }
  }, [editTitleWhileCreating, toggleTitleFocus]);

  function handleFocus() {
    isFocused.current = true;
    setPreviousTitle(currentTitle);
    textareaRef.current?.select();
  }

  function handleUpdateTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleBlur() {
    isFocused.current = false;
    if (currentTitle.trim()) {
      updateCategoryInStore(theCategory.category_id, {
        category_title: currentTitle,
      });
    } else {
      // If empty, revert to previous title
      setCurrentTitle(previousTitle);
    }
  }

  return (
    <input
      type="text"
      ref={textareaRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={currentTitle}
      onChange={handleUpdateTitle}
      maxLength={MAX_INPUT_CAT_TITLE}
      spellCheck={false}
      className={`overflow-hidden bg-inherit outline-none ${className}`}
    />
  );
}
