import { motion } from "framer-motion";

export default function Overlay({ isOpen, onClick, className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity ${className} ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      onClick={onClick}
    />
  );
}
