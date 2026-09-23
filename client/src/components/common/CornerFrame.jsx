export default function CornerFrame({ children, className = "" }) {
  const corner = "pointer-events-none absolute h-4 w-4 border-[#14B8A6]";
  return (
    <div className={`relative ${className}`}>
      {" "}
      <span
        aria-hidden="true"
        className={`${corner} left-0 top-0 border-l-2 border-t-2`}
      />{" "}
      <span
        aria-hidden="true"
        className={`${corner} right-0 top-0 border-r-2 border-t-2`}
      />{" "}
      <span
        aria-hidden="true"
        className={`${corner} bottom-0 left-0 border-b-2 border-l-2`}
      />{" "}
      <span
        aria-hidden="true"
        className={`${corner} bottom-0 right-0 border-b-2 border-r-2`}
      />{" "}
      {children}{" "}
    </div>
  );
}
