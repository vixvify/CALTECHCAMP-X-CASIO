import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const total = await prisma.user.count({
      where: {
        NOT: { username: 'adminteam' },
      },
    });
    const wait = await prisma.user.count({
      where: {
        stats: 'อยู่ระหว่างการคัดเลือก',
        NOT: { username: 'adminteam' },
      },
    });
    const pass = await prisma.user.count({
      where: { stats: 'ผ่านการคัดเลือก', NOT: { username: 'adminteam' } },
    });
    return NextResponse.json({ total, wait, pass }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
