"use client";

import Spinner from "@/app/_components/_ui/Spinner";
import SlugContent from "@/app/_components/SlugContent";
import { BG_COLORS } from "@/app/_lib/configs";
import useCategoryStore from "@/app/_store/useCategoryStore";
import { notFound, useParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const params = useParams();
  const slugId = params?.slug;

  const { categoriesList } = useCategoryStore(
    useShallow((state) => ({ categoriesList: state.categoriesList })),
  );

  // Look up the category from the store
  const theCategory = categoriesList?.find((cat) => cat.category_id === slugId);

  // Show spinner while data is loading or slug is missing
  if (!categoriesList || !slugId) {
    return <Spinner defaultBgColor={BG_COLORS["/default"]} />;
  }

  // If category doesn't exist, trigger the custom 404 page
  if (!theCategory) {
    notFound();
  }

  // Category exists → render the actual content
  return <SlugContent category={theCategory} />;
}
