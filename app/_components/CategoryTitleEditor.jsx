import useTaskStore from "@/app/taskStore";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { MAX_INPUT_CAT_TITLE } from "../_lib/configs";

export default function CategoryTitleEditor({ theCategory, className }) {
  const textareaRef = useRef(null);

  const { updateCategoryInStore, editTitleWhileCreating, toggleTitleFocus } =
    useTaskStore(
      useShallow((state) => ({
        updateCategoryInStore: state.updateCategoryInStore,
        editTitleWhileCreating: state.editTitleWhileCreating,
        toggleTitleFocus: state.toggleTitleFocus,
      })),
    );

  // Current value for display
  const [currentTitle, setCurrentTitle] = useState(theCategory?.category_title);

  // Store the previous title value
  const [previousTitle, setPreviousTitle] = useState(
    theCategory?.category_title,
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [theCategory?.title]);

  // Focus on textarea only when it has just created
  useEffect(() => {
    if (textareaRef.current && editTitleWhileCreating) {
      textareaRef.current.focus();
      toggleTitleFocus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1. Save the current value when input is focused (onFocus)
  function handleFocus() {
    setPreviousTitle(currentTitle);
    textareaRef.current?.select();
  }

  // 2. Update the current title while typing (onChange)
  function handleUpdateTitle(e) {
    setCurrentTitle(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  // 3. Store the title if it's not empty, otherwise restore the previous one (onBlur)
  function handleBlur() {
    if (currentTitle.trim())
      updateCategoryInStore(theCategory.category_id, {
        category_title: currentTitle,
      });
    if (currentTitle.trim() === "") setCurrentTitle(previousTitle);
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
