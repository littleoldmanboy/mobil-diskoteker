import clsx from "clsx";

export default function Filter({ as: Comp = 'button', className, ...restProps }) {
    return (
        <Comp 
            className={clsx('absolute top-[-10px] right-0 bg-darkGray h-5 w-5 text-[13px] font-normal text-[#a7a7a7] rounded-full transition-colors duration-200 ease-in-out border border-[#6a6a6a] hover:bg-[#303030] hover:text-white', className)}
            {...restProps}
        />
    );
}