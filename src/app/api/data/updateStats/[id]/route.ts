import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  const prisma = new PrismaClient();
  const { id } = params;
  const data = await req.json();

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
