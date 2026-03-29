import { memo, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value?: number | string;
  className?: string;
}

function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState<string | number>(0);

  useEffect(() => {
    if (value === undefined || value === null) return;

    const parseValue = (val: string | number): number => {
      if (typeof val === 'number') return val;

      const cleaned = val
        .replace(/[^0-9,.\\-]+/g, '')
        .replace(/\s/g, '')
        .replace(',', '.');

      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    };

    const formatValue = (val: number): string => {
      if (typeof value === 'string') {
        return (
          new Intl.NumberFormat('nb-NO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(val) + (value.match(/[^\d\s,.-]+$/)?.[0] ?? '')
        );
      }
      return val.toFixed(0);
    };

    const target = parseValue(value);
    const current = 0;
    const duration = 1000;
    const steps = 30;
    const stepSize = (target - current) / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const next = current + stepSize * step;
      if (step >= steps || next >= target) {
        setDisplay(formatValue(target));
        clearInterval(timer);
      } else {
        setDisplay(formatValue(next));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span className={className}>{display}</span>;
}

export default memo(AnimatedCounter);
