'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Sparkles } from 'lucide-react';

export function AdminMediaUpload() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  async function upload(formData: FormData) {
    setPending(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/media', { method: 'POST', body: formData });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Upload nije uspio.');
      formRef.current?.reset();
      setMessage('Fotografija je spremljena u nacrt.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload nije uspio.');
    } finally {
      setPending(false);
    }
  }

  return <form ref={formRef} action={upload} className="admin-media-card admin-media-new">
    <Sparkles aria-hidden="true" /><h3>Dodajte fotografiju</h3>
    <label><span>Naziv</span><input name="name" required /></label>
    <label><span>Opis fotografije</span><input name="alt" required /></label>
    <label><span>Datoteka</span><input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required /></label>
    <small>JPG, PNG, WebP ili GIF · najviše 8 MB</small>
    {message && <output className="admin-upload-message">{message}</output>}
    <button type="submit" disabled={pending}><Plus aria-hidden="true" /> {pending ? 'Spremanje…' : 'Dodaj u zbirku'}</button>
  </form>;
}
