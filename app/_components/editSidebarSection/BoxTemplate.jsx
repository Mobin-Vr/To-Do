function BoxTemplate({ children, className }) {
  return (
    <div
      className={`border-1 rounded-md border border-accent-200 bg-slate-50 ${className}`}
    >
      {children}
    </div>
  );
}

export default BoxTemplate;
