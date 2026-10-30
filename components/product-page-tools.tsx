'use client';

import { useState } from 'react';
import { Check, Heart, Scale } from 'lucide-react';

const storageKey = 'vespera-saved-products-v1';

function readSavedProducts() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function ProductPageTools({ productName }: { productName: string }) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');

  function toggleSaved() {
    const current = readSavedProducts();
    const nextSaved = !current.includes(productName);
    const next = nextSaved ? [...current, productName] : current.filter((item) => item !== productName);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSaved(nextSaved);
    setMessage(nextSaved ? `${productName} je spremljen za razgovor u salonu.` : `${productName} je uklonjen sa spremljenog popisa.`);
  }

  return (
    <div className="product-page-tools">
      <button type="button" aria-pressed={saved} onClick={toggleSaved}>
        {saved ? <Check aria-hidden="true" /> : <Heart aria-hidden="true" />}
        {saved ? 'Spremljeno' : 'Spremite proizvod'}
      </button>
      <a href="#slicni-modeli"><Scale aria-hidden="true" /> Usporedite slične modele</a>
      {message ? <output className="copy-status">{message}</output> : null}
    </div>
  );
}
