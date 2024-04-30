import clsx from "clsx";
import { PrismicNextLink } from '@prismicio/next';

export default function Button({ className, ...restProps }) {
    return (
        <PrismicNextLink 
            className={clsx('font-medium flex text-white tracking-wider bg-[#303030] justify-center items-center rounded-full hover:bg-[#3a3a3a] transition-colors duration-200 ease-in-out', className)}
            {...restProps}
        />
    );
}
