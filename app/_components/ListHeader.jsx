"use client";

import { useShallow } from "zustand/react/shallow";
import { defaultCategoryId } from "../_lib/configs";
import { getFormattedDate } from "../_lib/utils";
import useTaskStore from "../taskStore";
import DeleteBtn from "./_ui/DeleteBtn";
import MenuBtn from "./_ui/MenuBtn";
import SortMethodBtn from "./_ui/SortMethodBtn";
import CategoryTitleEditor from "./CategoryTitleEditor";
import ShareBtn from "./shareListSection/ShareBtn";

export default function ListHeader({
  listConfig,
  className,
  handleDeleteCategory,
  handleLeaveInvitation,
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

  const isCategoryPartner =
    theCategoryId !== defaultCategoryId &&
    theCategory.category_owner_id !== getUserState().user_id;

  const isEditable =
    theCategoryId !== defaultCategoryId &&
    theCategory.category_owner_id === getUserState().user_id;

  return (
    <div
      className={`md:mt-4 md:flex md:items-center ${className}`}
      style={{ backgroundColor: bgColor.mainBackground }}
    >
      <MenuBtn className="mb-2 mt-6 -translate-y-1" bgColor={bgColor} />

      {listName !== "Search" && (
        <div
          className="flex w-full items-center justify-between px-1"
          style={{ color: bgColor.primaryText }}
        >
          <div className="flex w-11/12 flex-col items-start justify-center">
            <h1
              className="flex items-center overflow-hidden text-3xl font-medium leading-tight"
              title={query}
            >
              {listIcon && (
                <span className="mr-2 h-full w-full">{listIcon}</span>
              )}

              {theCategoryId === defaultCategoryId && !isEditable ? (
                <p className="mt-1.5 text-nowrap">{listName}</p>
              ) : (
                <CategoryTitleEditor
                  theCategory={theCategory}
                  className="mr-2 w-full overflow-hidden text-ellipsis"
                />
              )}
            </h1>

            {/* if the page is my day we should also render the date  */}
            {listName === "My Day" && (
              <span
                className="ml-1 text-sm font-extralight leading-tight"
                style={{ color: bgColor.primaryText }}
              >
                {getFormattedDate()}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {isCategoryOwner && (
              <>
                <ShareBtn theCategoryId={theCategoryId} bgColor={bgColor} />
                <DeleteBtn onClick={handleDeleteCategory} bgColor={bgColor} />
              </>
            )}

            {isCategoryPartner && (
              <DeleteBtn onClick={handleLeaveInvitation} bgColor={bgColor} />
            )}

            <SortMethodBtn bgColor={bgColor} />
          </div>
        </div>
      )}

      {listName === "Search" && (
        <div
          className="flex flex-col justify-center overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap px-1 leading-tight md:mt-4"
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
