import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'vespera_admin_session';
const SESSION_SECONDS = 60 * 60 * 8;

function secret() {
  return process.env.VESPERA_SESSION_SECRET ?? (process.env.NODE_ENV === 'production' ? '' : 'local-vespera-admin-secret');
}

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

export function adminIsConfigured() {
  return Boolean(process.env.VESPERA_ADMIN_PASSWORD) || process.env.NODE_ENV !== 'production';
}

function secureEqual(value: string, expected: string) {
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  return Boolean(expected) && left.length === right.length && timingSafeEqual(left, right);
}

export function validCredentials(username: string, password: string) {
  const expectedUsername = process.env.VESPERA_ADMIN_USERNAME ?? (process.env.NODE_ENV === 'production' ? '' : 'admin');
  const expected = process.env.VESPERA_ADMIN_PASSWORD ?? (process.env.NODE_ENV === 'production' ? '' : 'vespera-preview');
  return secureEqual(username, expectedUsername) && secureEqual(password, expected);
}

export async function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({ expiresAt: Date.now() + SESSION_SECONDS * 1000 })).toString('base64url');
  const value = `${payload}.${sign(payload)}`;
  (await cookies()).set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_SECONDS,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value || !secret()) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { expiresAt?: number };
    return typeof parsed.expiresAt === 'number' && parsed.expiresAt > Date.now();
  } catch {
    return false;
  }
}
