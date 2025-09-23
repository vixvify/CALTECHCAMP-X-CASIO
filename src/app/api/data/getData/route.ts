import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const token = await getToken({ req });

  if (!token) {
    return null;
  }

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
