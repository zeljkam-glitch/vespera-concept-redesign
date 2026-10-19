'use client';

import { useEffect, useState } from 'react';
import styles from './text-size-control.module.css';

type TextSize = 'smaller' | 'standard' | 'larger';
type TextSizeControlProps = { variant?: 'site' | 'os' };

const storageKey = 'vespera-text-size';
const sizes: { id: TextSize; label: string; short: string; root: string; body: string }[] = [
  { id: 'smaller', label: 'Smanji veličinu teksta', short: 'A−', root: '90%', body: '16.2px' },
  { id: 'standard', label: 'Vrati standardnu veličinu teksta', short: 'A', root: '100%', body: '18px' },
  { id: 'larger', label: 'Povećaj veličinu teksta', short: 'A+', root: '112.5%', body: '20.25px' },
];

function isTextSize(value: string | null): value is TextSize {
  return sizes.some((size) => size.id === value);
}

function applyTextSize(value: TextSize) {
  const selected = sizes.find((size) => size.id === value) ?? sizes[1];
  document.documentElement.style.fontSize = selected.root;
  document.body.style.fontSize = selected.body;
  document.documentElement.dataset.textSize = value;
}

export function TextSizeControl({ variant = 'site' }: TextSizeControlProps) {
  const [current, setCurrent] = useState<TextSize>('standard');

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    const initial = isTextSize(stored) ? stored : 'standard';
    applyTextSize(initial);
    const frame = window.requestAnimationFrame(() => setCurrent(initial));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function selectSize(value: TextSize) {
    applyTextSize(value);
    window.localStorage.setItem(storageKey, value);
    setCurrent(value);
  }

  return (
    <fieldset className={`${styles.control} ${variant === 'os' ? styles.osControl : styles.siteControl}`}>
      <legend className="sr-only">Veličina teksta</legend>
      {sizes.map((size) => <button key={size.id} type="button" className={current === size.id ? styles.active : ''} aria-label={size.label} aria-pressed={current === size.id} onClick={() => selectSize(size.id)}>{size.short}</button>)}
      <span className="sr-only" aria-live="polite">Odabrana veličina teksta: {current === 'smaller' ? 'manja' : current === 'larger' ? 'veća' : 'standardna'}.</span>
    </fieldset>
  );
}
