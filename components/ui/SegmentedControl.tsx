import { cx } from './cx';

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group. */
  label: string;
  className?: string;
}

/** Pill-shaped switch between a few mutually exclusive modes. */
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx(
        'relative flex w-full max-w-sm rounded-pill border border-divider bg-surface-200 p-1',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 rounded-pill border border-divider bg-surface-100 transition-transform duration-300 ease-in-out"
        style={{
          width: `calc((100% - 8px) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cx(
              'relative z-10 flex-1 rounded-pill px-4 py-2 text-small font-semibold transition-colors',
              selected ? 'text-brand-mid' : 'text-ink-muted hover:text-ink'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
