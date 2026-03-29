import { cn } from '@repo/ui/lib/utils';

interface ChartContainerProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function ChartContainer(props: ChartContainerProps) {
  const { title, children, className } = props;

  return (
    <div className={cn('overflow-hidden bg-white shadow-sm', className)}>
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-medium text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}
