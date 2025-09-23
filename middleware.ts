import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LIMIT = 10;
const WINDOW = 60 * 1000;

const ipRequests: Record<string, { count: number; last: number }> = {};

export function middleware(req: NextRequest) {
  const ip =
    (req as any).ip ||
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown';

  const now = Date.now();

  if (!ipRequests[ip]) {
    ipRequests[ip] = { count: 1, last: now };
  } else {
    if (now - ipRequests[ip].last > WINDOW) {
      ipRequests[ip] = { count: 1, last: now };
    } else {
      ipRequests[ip].count++;
    }
  }

  if (ipRequests[ip].count > LIMIT) {
    return new NextResponse('⛔ Too Many Requests', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
