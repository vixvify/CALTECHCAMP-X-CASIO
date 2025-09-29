import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  const { id } = params;
  const data = await req.json();
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ msg: 'not found' }, { status: 404 });
  }

  try {
    await prisma.user.update({ where: { id }, data });
    return NextResponse.json({ status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        error: err,
      },
      { status: 500 },
    );
  }
}
