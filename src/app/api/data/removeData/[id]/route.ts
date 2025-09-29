import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  const { id } = params;
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ msg: 'not found' }, { status: 404 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ msg: 'ลบสำเร็จ' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
