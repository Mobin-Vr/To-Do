"use client";

import useCategoryStore from "@/app/_store/useCategoryStore";
import useUiStore from "@/app/_store/useUiStore";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { MAX_INPUT_CAT_TITLE } from "@/app/_lib/configs";
import autosize from "autosize";

export default function CategoryTitleEditor({ theCategory, className }) {
  const textareaRef = useRef(null);
  const isFocused = useRef(false);

  const { updateCategoryInStore } = useCategoryStore(
    useShallow((state) => ({
      updateCategoryInStore: state.updateCategoryInStore,
    })),
  );
  const { editTitleWhileCreating, toggleTitleFocus } = useUiStore(
    useShallow((state) => ({
      editTitleWhileCreating: state.editTitleWhileCreating,
      toggleTitleFocus: state.toggleTitleFocus,
    })),
  );

  const [currentTitle, setCurrentTitle] = useState(
    theCategory?.category_title ?? "",
  );
  const [previousTitle, setPreviousTitle] = useState(
    theCategory?.category_title ?? "",
  );

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

  useEffect(() => {
    if (!isFocused.current && theCategory?.category_title !== undefined) {
      setCurrentTitle(theCategory.category_title);
      setPreviousTitle(theCategory.category_title);
    }
  }, [theCategory?.category_title]);

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
