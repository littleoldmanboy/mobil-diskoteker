import clsx from "clsx";

export default function Filter({
  as: Comp = "button",
  className,
  isChosen,
  ...restProps
}) {
  return (
    <Comp
      className={clsx(
        "relative py-5 px-[25px] text-[13px] font-medium flex tracking-wider justify-center items-center rounded-full transition-all duration-200 ease-in-out border border-[#6a6a6a]",
        isChosen
        // Styles of filter is chosen
          ? "bg-white text-darkGray hover:bg-white/80"
        // Styles of filter is not chosen
          : "bg-darkGray text-white hover:bg-[#2d2e2f]",
        className
      )}
      {...restProps}
    />
  );
}
