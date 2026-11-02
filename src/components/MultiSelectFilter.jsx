import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon.jsx";

export default function MultiSelectFilter({ label, allLabel, options = [], groups = [], value, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();
  const availableOptions = groups.length ? groups.flatMap((group) => group.options) : options;
  const selected = Array.isArray(value) ? value : availableOptions.includes(value) ? [value] : [];

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
    };
  }, [open]);

  const toggle = (option) => onChange(selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option]);

  const renderOption = (option) => (
    <label key={option}><input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} /><span>{option}</span></label>
  );

  return (
    <div ref={containerRef} className={`multi-filter${open ? " is-open" : ""}`} onKeyDown={(event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }}>
      <button ref={triggerRef} type="button" className="multi-filter-trigger" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((previous) => !previous)}>
        <span>{label}</span><strong>{selected.length ? `${selected.length} seleccionadas` : allLabel}</strong><Icon name="down" size={12} />
      </button>
      {open && <div id={panelId} className="multi-filter-options" role="group" aria-label={label}>
        <button type="button" onClick={() => onChange([])}>{allLabel}</button>
        {groups.length ? groups.map((group) => (
          <fieldset className="multi-filter-region" key={group.label}>
            <legend>{group.label}</legend>
            {group.options.map(renderOption)}
          </fieldset>
        )) : options.map(renderOption)}
      </div>}
    </div>
  );
}
