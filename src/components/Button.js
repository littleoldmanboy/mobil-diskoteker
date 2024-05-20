import clsx from "clsx";
import { PrismicNextLink } from '@prismicio/next';

export default function Button({ className, ...restProps }) {
    return (
        <PrismicNextLink 
            className={clsx('flex text-white tracking-wider justify-center items-center rounded-full transition-colors duration-200 ease-in-out', className)}
            {...restProps}
        />
    );
}
