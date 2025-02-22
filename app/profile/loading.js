import Spinner from "@/app/_components/_ui/Spinner";
import { BG_COLORS } from "../_lib/configs";

export default function Loading() {
  const defaultBgColor = BG_COLORS["/default"];

  return <Spinner defaultBgColor={defaultBgColor} />;
}
