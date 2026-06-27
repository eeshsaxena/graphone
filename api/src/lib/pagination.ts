// Cursor-based pagination (preferred per spec), with offset also accepted.
// The cursor is an opaque base64 of the absolute offset — simple, stable, and
// avoids leaking internal ids while staying easy to reason about.

export interface PageParams {
  limit: number;
  offset: number;
}

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function decodeCursor(cursor: string): number {
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf8');
    const offset = parseInt(decoded.replace('offset:', ''), 10);
    return Number.isFinite(offset) && offset >= 0 ? offset : 0;
  } catch {
    return 0;
  }
}

function encodeCursor(offset: number): string {
  return Buffer.from(`offset:${offset}`).toString('base64');
}

export function parsePageParams(query: Record<string, unknown>): PageParams {
  const limit = Math.max(
    1,
    Math.min(MAX_LIMIT, parseInt(String(query.limit ?? DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
  );
  let offset = 0;
  if (query.cursor) offset = decodeCursor(String(query.cursor));
  else if (query.offset) offset = Math.max(0, parseInt(String(query.offset), 10) || 0);
  return { limit, offset };
}

export interface Paged<T> {
  items: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    next_cursor: string | null;
    has_more: boolean;
  };
}

export function paginate<T>(all: T[], params: PageParams): Paged<T> {
  const { limit, offset } = params;
  const items = all.slice(offset, offset + limit);
  const nextOffset = offset + limit;
  const hasMore = nextOffset < all.length;
  return {
    items,
    meta: {
      total: all.length,
      limit,
      offset,
      next_cursor: hasMore ? encodeCursor(nextOffset) : null,
      has_more: hasMore,
    },
  };
}
