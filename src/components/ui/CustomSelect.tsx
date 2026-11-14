"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { T, tr, useLocale } from "@/i18n/locale";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  name?: string;
  value: string;
  options: readonly SelectOption[] | SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  triggerClassName?: string;
  chevronSrc?: string;
  accent?: boolean;
  onChange: (value: string) => void;
};

export function CustomSelect({
  name,
  value,
  options,
  placeholder = "Select",
  ariaLabel,
  className,
  triggerClassName,
  chevronSrc = "/assets/icons/chevron.svg",
  accent = false,
  onChange,
}: CustomSelectProps) {
  const { locale } = useLocale();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("custom-select", open && "is-open", accent && "custom-select--accent", className)}>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        className={cn("custom-select__trigger", triggerClassName)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel ? tr(locale, ariaLabel) : tr(locale, placeholder)}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={cn("custom-select__value", !selected && "is-placeholder")}>
          <T>{selected?.label ?? placeholder}</T>
        </span>
        <Icon src={chevronSrc} width={24} height={24} className="custom-select__chevron" />
      </button>

      {open ? (
        <ul id={listId} className="custom-select__menu" role="listbox">
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={cn("custom-select__option", active && "is-active")}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <T>{option.label}</T>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
