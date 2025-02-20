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
  query,
}) {
  const { bgColor, listName, listIcon, theCategory } = listConfig;

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
          className={`flex items-center px-1 sm:mt-10 ${
            listName === "Search" ? "justify-center" : "justify-between"
          }`}
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
          className="ml-1 mt-1.5 overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap leading-tight"
          title={query}
          style={{ color: bgColor.primaryText }}
        >
          <span className="block text-sm font-extralight text-accent-200">
            Results for
          </span>

          <span className="text-2xl font-normal leading-none">{query}</span>
        </div>
      )}
    </div>
  );
}
