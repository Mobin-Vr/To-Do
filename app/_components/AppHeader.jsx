"use client";

import { useShallow } from "zustand/react/shallow";
import { defaultCategoryId } from "../_lib/configs";
import { getFormattedDate } from "../_lib/utils";
import useTaskStore from "../taskStore";
import DeleteBtn from "./_ui/DeleteBtn";
import MenuBtn from "./_ui/MenuBtn";
import SortMethodBtn from "./_ui/SortMethodBtn";
import CategoryTitleEditor from "./CategoryTitleEditor";
import ShareBtn from "./shareList/ShareBtn";

export default function AppHeader({
  listConfig,
  className,
  handleDeleteCategory,
  theCategoryId,
}) {
  const { bgColor, listName, listIcon, theCategory, query = "" } = listConfig;

  const { getUserState } = useTaskStore(
    useShallow((state) => ({
      getUserState: state.getUserState,
    })),
  );

  const isCategoryOwner =
    theCategoryId !== defaultCategoryId &&
    theCategory.category_owner_id === getUserState().user_id;

  const isEditable =
    theCategoryId !== defaultCategoryId &&
    theCategory.category_owner_id === getUserState().user_id;

  return (
    <div
      className={`${className}`}
      style={{ backgroundColor: bgColor.mainBackground }}
    >
      <MenuBtn
        className="mt-6 -translate-x-1 -translate-y-1"
        bgColor={bgColor}
      />

      {listName !== "Search" && (
        <div
          className="flex items-center justify-between px-1 sm:mt-10"
          style={{ color: bgColor.primaryText }}
        >
          <h1
            className="flex items-center gap-3 overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-3xl font-medium leading-tight"
            title={query}
          >
            {listIcon}

            {theCategoryId === defaultCategoryId ? (
              listName
            ) : isEditable ? (
              <CategoryTitleEditor theCategory={theCategory} />
            ) : (
              listName
            )}
          </h1>

          <div className="flex gap-2">
            {isCategoryOwner && (
              <>
                <ShareBtn theCategoryId={theCategoryId} bgColor={bgColor} />

                <DeleteBtn onClick={handleDeleteCategory} bgColor={bgColor} />
              </>
            )}

            <SortMethodBtn bgColor={bgColor} />
          </div>
        </div>
      )}

      {/* if the page is my day we should also render the date  */}
      {listName === "My Day" && (
        <span
          className="ml-1 text-sm font-extralight"
          style={{ color: bgColor.primaryText }}
        >
          {getFormattedDate()}
        </span>
      )}

      {listName === "Search" && (
        <div
          className="overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap px-1 leading-tight sm:mt-10"
          title={query}
          style={{ color: bgColor.primaryText }}
        >
          <span className="mb-1 block text-sm font-extralight text-accent-200">
            Results for
          </span>

          <div className="text-3xl font-normal leading-none">
            <span className="opacity-60">&quot;</span>
            <span>{query}</span>
            <span className="opacity-60">&quot;</span>
          </div>
        </div>
      )}
    </div>
  );
}
