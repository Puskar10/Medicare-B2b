import { LoaderCircle } from "lucide-react";
export default function Loading({
  text = "Loading CuraMed...",
  fullScreen = false,
}) {
  return (
    <div
      className={`flex items-center justify-center bg-white ${fullScreen ? "min-h-screen" : "min-h-[50vh]"}`}
    >
      {" "}
      <div className="flex flex-col items-center text-center">
        {" "}
        {/* Logo / Brand */}{" "}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {" "}
          {/* Outer rotating ring */}{" "}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-200 border-t-[#0F4C81]" />{" "}
          {/* Inner ring */}{" "}
          <div className="absolute inset-2 rounded-full border border-[#14B8A6]/30" />{" "}
          {/* Brand mark */}{" "}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F4C81] shadow-lg shadow-[#0F4C81]/20">
            {" "}
            <span className="text-2xl font-black text-white">C</span>{" "}
          </div>{" "}
        </div>{" "}
        {/* Brand name */}{" "}
        <div className="mt-6">
          {" "}
          <h2 className="text-xl font-black uppercase tracking-[0.18em] text-slate-900">
            {" "}
            CuraMed{" "}
          </h2>{" "}
          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[#14B8A6]" />{" "}
        </div>{" "}
        {/* Loading text */}{" "}
        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
          {" "}
          <LoaderCircle className="h-4 w-4 animate-spin text-[#14B8A6]" />{" "}
          <span>{text}</span>{" "}
        </div>{" "}
        {/* Loading dots */}{" "}
        <div className="mt-4 flex items-center gap-1.5">
          {" "}
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0F4C81]" />{" "}
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#14B8A6] [animation-delay:150ms]" />{" "}
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0F4C81] [animation-delay:300ms]" />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
