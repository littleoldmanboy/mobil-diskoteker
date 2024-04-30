import clsx from 'clsx';

export default function Bounded({ as: Comp = 'section', className, children, ...props }) {
  return (
    <Comp
        className={clsx('bg-darkGray px-[30px]', className)}
        {...props}
    >
        {children}
    </Comp>
  );
}
