import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const res = await prisma.user.findMany({});
    const newRes = res
      .filter((e) => e.username !== 'adminteam')
      .map((e) => {
        return {
          id: e.id,
          idea: e.team,
          email: e.email,
          stats: e.stats,
        };
      });
    return NextResponse.json({ data: newRes }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
