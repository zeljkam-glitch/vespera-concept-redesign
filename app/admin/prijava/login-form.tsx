'use client';

import { useActionState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { loginAction } from '@/app/admin/actions';

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(loginAction, { error: '' });
  return (
    <form action={action} className="admin-login-form">
      <label htmlFor="username">Korisničko ime</label>
      <input id="username" name="username" type="text" autoComplete="username" required />
      <label htmlFor="password">Administratorska lozinka</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
      {!configured && <p className="admin-form-error" role="alert">Admin nije konfiguriran. Postavite VESPERA_ADMIN_PASSWORD i VESPERA_SESSION_SECRET.</p>}
      <button className="button button-accent" type="submit" disabled={pending || !configured}>
        <LockKeyhole aria-hidden="true" /> {pending ? 'Prijava…' : 'Uđite u Admin'}
      </button>
    </form>
  );
}
