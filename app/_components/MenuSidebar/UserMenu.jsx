import { ClerkLoaded, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import ProfileModal from "./ProfileModal";
import UserStatus from "./UserStatus";

function UserMenu({ user, createClerkPasskey, className }) {
  const userMenuBtnRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-[2.625rem] h-[2.625rem]",
    },
  };

  return (
    <ClerkLoaded>
      {user && (
        <div className={`relative flex items-center gap-3 ${className}`}>
          {/* NOTE Actually it is user profile */}
          <UserButton appearance={userButtonAppearance} />

          <button
            className="flex flex-col items-start overflow-hidden"
            ref={userMenuBtnRef}
            onClick={toggleModal}
          >
            <strong
              title={user.fullName}
              className="overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-sm font-medium leading-tight"
            >
              {user.fullName}
            </strong>

            <UserStatus user={user} />
          </button>

          <AnimatePresence>
            {isModalOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  className="fixed inset-0 z-40 w-full rounded-md bg-black bg-opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={toggleModal}
                />

                {/* Modal */}
                <motion.div
                  className="absolute left-1/2 top-14 z-50 w-fit min-w-[17rem] overflow-hidden rounded-2xl bg-white text-xs font-light shadow-2xl"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: -20,
                    x: "-50%",
                  }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.9, y: -20, x: "-50%" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ProfileModal user={user} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </ClerkLoaded>
  );
}

export default UserMenu;
