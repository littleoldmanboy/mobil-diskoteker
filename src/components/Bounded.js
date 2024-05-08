import clsx from 'clsx';

export default function Bounded({ as: Comp = 'section', className, children, ...restProps }) {
  return (
    <Comp
        className={clsx('bg-darkGray px-[30px]', className)}
        {...restProps}
    >
        {children}
    </Comp>
  );
}
