import { UserProfile } from "@clerk/nextjs";
import MenuBtn from "../../_components/_ui/MenuBtn";
import { BG_COLORS } from "../../_lib/configs";

export default function Page() {
  const bgColor = BG_COLORS["/my-day"];

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gray-50">
      <MenuBtn className="absolute left-8 top-6 z-10" bgColor={bgColor} />

      <UserProfile />
    </div>
  );
}
