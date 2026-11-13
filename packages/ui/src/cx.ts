/**
 * @visahobe/ui — shared class-composition helpers.
 * Framework-free so it can be imported from both server and client components.
 */

export type ClassValue =
  | string
  | number
  | bigint
  | null
  | undefined
  | false
  | ''
  | Record<string, boolean | null | undefined>;

/** Minimal, dependency-free `clsx`. */
export function cx(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
      out.push(String(value));
      continue;
    }
    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) out.push(key);
    }
  }
  return out.join(' ');
}

/** Zero-padded, human-readable identifier used across case/task surfaces. */
export function formatId(prefix: string, value: number, pad = 4): string {
  return `${prefix}-${String(value).padStart(pad, '0')}`;
}
