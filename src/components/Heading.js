import clsx from "clsx";

export default function Heading({
    as: Comp = 'h1', className, children, size = 'lg'
}) {
    return (
        <Comp className={clsx(
            'leading-tight md:leading-tight', 
            size === "xl" && "md:text-5xl text-4xl",
            size === "lg" && "md:text-4xl text-3xl",
            size === "md" && "md:text-3xl text-2xl",
            size === "sm" && "md:text-2xl text-xl",
            className
        )}>
            {children}
        </Comp>
    );
}
