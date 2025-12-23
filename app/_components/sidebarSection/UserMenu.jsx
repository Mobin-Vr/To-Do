import { ClerkLoaded, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Overlay from "../_ui/Overlay";
import ProfileModal from "./ProfileModal";
import UserStatus from "./UserStatus";

function UserMenu({ user, className }) {
  const userMenuBtnRef = useRef(null);
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        userMenuBtnRef.current &&
        !userMenuBtnRef.current.contains(event.target)
      )
        setIsModalOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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
              className="overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-[0.95rem] font-medium leading-tight"
            >
              {user.fullName}
            </strong>

            <UserStatus user={user} />
          </button>

          <AnimatePresence>
            {isModalOpen && (
              <>
                <Overlay
                  onClick={toggleModal}
                  isOpen={isModalOpen}
                  zIndex={40}
                  className="rounded-r-md"
                />

                {/* Modal */}
                <motion.div
                  ref={modalRef}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: "-3.5rem",
                    x: "-50%",
                  }}
                  animate={{ opacity: 1, scale: 1, y: "-3.5rem", x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.9, y: "-3.5rem", x: "-50%" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute left-1/2 top-14 z-50 w-fit min-w-[17rem] overflow-hidden rounded-2xl bg-white text-xs font-light shadow-2xl"
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
