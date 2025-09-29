import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

type Data = {
  username: string;
  id: string;
  team: string;
  email: string;
  stats: string;
};

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ msg: 'not found' }, { status: 404 });
  }

  try {
    const res = await prisma.user.findMany({});
    const newRes = res
      .filter((e: Data) => e.username !== 'adminteam')
      .map((e: Data) => {
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
