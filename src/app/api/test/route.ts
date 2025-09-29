import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 404 });
  }
}
