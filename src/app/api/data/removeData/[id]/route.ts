import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  const prisma = new PrismaClient();
  const { id } = params;

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ msg: 'ลบสำเร็จ' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
