import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function GET(req: NextRequest, { params }: { params: any }) {
  const prisma = new PrismaClient();
  const { id } = params;

  try {
    const res = await prisma.user.findUnique({ where: { id } });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
