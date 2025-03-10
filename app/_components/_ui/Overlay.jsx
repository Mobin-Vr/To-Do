import { motion } from "framer-motion";

export default function Overlay({
  isOpen,
  onClick = () => {}, // Nothing to do by default
  className,
  children = null,
  zIndex = 40,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ zIndex: zIndex }}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity ${className} ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      onClick={onClick}
    >
      {/* Render children if any */}
      {children}
    </motion.div>
  );
}
