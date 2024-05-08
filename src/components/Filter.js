import clsx from "clsx";

export default function Filter({ as: Comp = 'button', className, ...restProps }) {
    return (
        <Comp 
            className={clsx('text-[13px] font-medium flex text-white tracking-wider justify-center items-center rounded-full transition-colors duration-200 ease-in-out border border-[#6a6a6a] hover:bg-[#303030]', className)}
            {...restProps}
        />
    );
}
