import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;
  const prisma = new PrismaClient();

  try {
    const res = await prisma.user.findUnique({ where: { email: id } });
    return NextResponse.json({ stats: res?.stats }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
