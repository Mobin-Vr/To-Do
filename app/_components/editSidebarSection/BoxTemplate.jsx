function BoxTemplate({ children, className }) {
  return (
    <div
      className={`border-1 rounded-md border border-gray-300 bg-slate-50 ${className}`}
    >
      {children}
    </div>
  );
}

export default BoxTemplate;
