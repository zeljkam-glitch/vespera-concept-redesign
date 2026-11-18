'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import { catalogGroups, catalogHref } from '@/lib/catalog-navigation';

const links = [
  { text: 'Rasprodaja – izložbeni artikli', href: '/namjestaj?status=Izložbeni+primjerak' },
  { text: 'Savjeti', href: '/blog' },
  { text: 'O salonu', href: '/#salon-info' },
];

export function CatalogNavigation({ mobile = false }: { mobile?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    function closeOutside(event: PointerEvent) {
      if (element?.contains(event.target as Node)) return;
      element?.querySelectorAll('details[open]').forEach((item) => item.removeAttribute('open'));
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      const open = (event.target as HTMLElement).closest('details[open]');
      if (!open) return;
      open.removeAttribute('open');
      open.querySelector('summary')?.focus();
      event.stopPropagation();
    }

    document.addEventListener('pointerdown', closeOutside);
    element.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      element.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  function close() {
    root.current?.querySelectorAll('details[open]').forEach((item) => item.removeAttribute('open'));
  }

  const navigation = (
    <nav className={mobile ? 'mobile-catalog-nav' : 'desktop-nav'} aria-label={mobile ? 'Mobilna navigacija' : 'Glavna navigacija'}>
      {catalogGroups.map((group) => (
        <details className="nav-group" name={mobile ? 'mobile-catalog-group' : 'desktop-catalog-group'} key={group.name}>
          <summary>{group.name}<ChevronDown size={15} aria-hidden="true" /></summary>
          <div className="nav-group-links">
            {group.categories.map((category) => (
              <Link key={category.label} href={catalogHref(group.name, category)} onClick={close}>{category.label}</Link>
            ))}
          </div>
        </details>
      ))}
      {links.map(({ text, href }) => <Link key={href} href={href} onClick={close}>{text}</Link>)}
      {mobile && <>
        <Link href="/novosti" onClick={close}>Novosti</Link>
        <Link href="/informacije" onClick={close}>Korisnički kutak</Link>
      </>}
    </nav>
  );

  return (
    <div ref={root} className={mobile ? 'mobile-navigation' : 'desktop-navigation'}>
      {mobile ? (
        <details className="mobile-menu">
          <summary aria-label="Glavni izbornik"><Menu size={27} aria-hidden="true" /></summary>
          {navigation}
        </details>
      ) : navigation}
    </div>
  );
}
