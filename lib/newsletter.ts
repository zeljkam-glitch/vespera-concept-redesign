import 'server-only';

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { get, put } from '@vercel/blob';

export type NewsletterRecord = {
  email: string;
  status: 'active' | 'unsubscribed';
  consentAt: string | null;
  consentVersion: '2026-10-29';
  source: string;
  unsubscribedAt: string | null;
  updatedAt: string;
};

const localPath = path.join(process.cwd(), '.data', 'newsletter-subscribers.json');
const blobPath = 'newsletter/subscribers.json';

function hasBlobStorage() {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

function isRecord(value: unknown): value is NewsletterRecord {
  if (!value || typeof value !== 'object') return false;
  const record = value as Partial<NewsletterRecord>;
  return typeof record.email === 'string' && (record.status === 'active' || record.status === 'unsubscribed');
}

async function readRecords(): Promise<NewsletterRecord[]> {
  try {
    if (hasBlobStorage()) {
      const result = await get(blobPath, { access: 'private', useCache: false });
      if (!result || result.statusCode !== 200) return [];
      const value: unknown = JSON.parse(await new Response(result.stream).text());
      return Array.isArray(value) ? value.filter(isRecord) : [];
    }

    const value: unknown = JSON.parse(await readFile(localPath, 'utf8'));
    return Array.isArray(value) ? value.filter(isRecord) : [];
  } catch {
    return [];
  }
}

async function writeRecords(records: NewsletterRecord[]) {
  const payload = `${JSON.stringify(records, null, 2)}\n`;
  if (hasBlobStorage()) {
    await put(blobPath, payload, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json; charset=utf-8',
      cacheControlMaxAge: 60,
    });
    return;
  }

  await mkdir(path.dirname(localPath), { recursive: true });
  const temporaryPath = `${localPath}.tmp`;
  await writeFile(temporaryPath, payload, 'utf8');
  await rename(temporaryPath, localPath);
}

export function normalizeEmail(value: string) {
  return value.trim().toLocaleLowerCase('en-US');
}

export function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function subscribe(email: string, source: string) {
  const records = await readRecords();
  const now = new Date().toISOString();
  const next: NewsletterRecord = {
    email,
    status: 'active',
    consentAt: now,
    consentVersion: '2026-10-29',
    source,
    unsubscribedAt: null,
    updatedAt: now,
  };
  const existingIndex = records.findIndex((record) => record.email === email);
  if (existingIndex >= 0) records[existingIndex] = next;
  else records.push(next);
  await writeRecords(records);
}

export async function unsubscribe(email: string, source: string) {
  const records = await readRecords();
  const now = new Date().toISOString();
  const existingIndex = records.findIndex((record) => record.email === email);
  const next: NewsletterRecord = existingIndex >= 0
    ? { ...records[existingIndex], status: 'unsubscribed', unsubscribedAt: now, updatedAt: now, source }
    : { email, status: 'unsubscribed', consentAt: null, consentVersion: '2026-10-29', source, unsubscribedAt: now, updatedAt: now };
  if (existingIndex >= 0) records[existingIndex] = next;
  else records.push(next);
  await writeRecords(records);
}
