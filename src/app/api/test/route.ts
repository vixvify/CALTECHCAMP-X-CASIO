import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const data = await prisma.user.findMany();
  return NextResponse.json(data);
}
