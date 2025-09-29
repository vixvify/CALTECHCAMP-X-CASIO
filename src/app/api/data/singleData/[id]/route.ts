import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest, { params }: { params: any }) {
  const { id } = params;
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ msg: 'not found' }, { status: 404 });
  }

  try {
    const res = await prisma.user.findUnique({ where: { id } });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
