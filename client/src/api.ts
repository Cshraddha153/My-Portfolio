import type { Profile } from './types';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${API_BASE}/api/profile`);
  if (!res.ok) {
    throw new Error('Failed to load profile');
  }
  return res.json();
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
}

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || 'Failed to send message');
  }
  return data as ContactResponse;
}
