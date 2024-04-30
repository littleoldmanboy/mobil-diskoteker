import clsx from 'clsx';

export default function Bounded({ as: Comp = 'section', className, children, ...props }) {
  return (
    <Comp
        className={clsx('bg-darkGray', className)}
        {...props}
    >
        <div className="flex flex-col items-center justify-center">{children}</div>
    </Comp>
  );
}
