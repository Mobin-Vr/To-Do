import { Suspense } from "react";
import Spinner from "./_components/_ui/Spinner";

export default function Loading() {
  return (
    <Suspense fallback={null}>
      <Spinner />
    </Suspense>
  );
}
