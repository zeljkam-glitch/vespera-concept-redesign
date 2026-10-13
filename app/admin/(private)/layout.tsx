import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Eye, LayoutDashboard, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';
import { isAdmin } from '@/lib/admin/session';

export default async function PrivateAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/admin/prijava');
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <Link className="admin-brand" href="/admin"><Image src="/brand/vespera-logo-horizontal.svg" alt="Vespera namještaj" width={252} height={76} priority /><span>Admin</span></Link>
        <nav aria-label="Administracija">
          <Link href="/admin"><LayoutDashboard aria-hidden="true" /> Uređivanje</Link>
          <Link href="/admin/pregled"><Eye aria-hidden="true" /> Pregled nacrta</Link>
          <form action={logoutAction}><button type="submit"><LogOut aria-hidden="true" /> Odjava</button></form>
        </nav>
      </header>
      {children}
    </div>
  );
}
