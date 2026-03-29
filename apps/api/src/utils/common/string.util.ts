import { nanoid } from 'nanoid';

export function generateHash(length: number = 20): string {
  return nanoid(length);
}

export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
