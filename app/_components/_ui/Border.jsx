function Border({ className }) {
  return (
    <span
      className={`m-auto my-0.5 h-[1px] w-[92%] -translate-y-[10%] transform bg-gray-300 ${className}`}
    ></span>
  );
}

export default Border;
