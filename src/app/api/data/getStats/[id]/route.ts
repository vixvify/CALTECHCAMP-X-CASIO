import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;
  const prisma = new PrismaClient();
  const token = await getToken({ req });

  if (!token) {
    return null;
  }

  try {
    const res = await prisma.user.findUnique({ where: { id } });
    return NextResponse.json({ stats: res?.stats }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
