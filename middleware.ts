import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LIMIT = 10;
const WINDOW = 60 * 1000;

const ipRequests: Record<string, { count: number; last: number }> = {};

export async function middleware(req: NextRequest) {
  const { ip } = await req.json();

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
