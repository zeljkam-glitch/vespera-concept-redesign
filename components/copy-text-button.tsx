'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyTextButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return <button className="media-copy-button" type="button" onClick={copyText} aria-live="polite">
    {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
    {copied ? 'Tekst je kopiran' : 'Kopiraj tekst'}
  </button>;
}
