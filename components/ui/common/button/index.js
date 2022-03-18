const Button = ({ children, className, variant, hoverable=true, ...otherProps }) => {
  const colorVariants = {
    purple: hoverable ? "text-white bg-indigo-600 hover:bg-indigo-700" : "text-white bg-indigo-600",
    red: hoverable ? "text-white bg-red-600 hover:bg-red-700" : "text-white bg-red-600"
  };

  return (
    <button
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 border rounded-md text-base font-medium ${className} ${colorVariants[variant]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;