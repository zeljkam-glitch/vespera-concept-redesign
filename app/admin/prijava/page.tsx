import Image from 'next/image';
import { redirect } from 'next/navigation';
import { adminIsConfigured, isAdmin } from '@/lib/admin/session';
import { LoginForm } from './login-form';

export const metadata = { title: 'Prijava | Vespera Admin', robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin');
  const configured = adminIsConfigured();
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Image src="/brand/vespera-logo-horizontal.svg" alt="Vespera namještaj" width={360} height={108} priority />
        <p className="eyebrow">Privatno područje</p>
        <h1>Vespera Admin</h1>
        <p>Uredite ponudu u nacrtu, pregledajte je i objavite tek kada je spremna.</p>
        <LoginForm configured={configured} />
      </section>
    </main>
  );
}
