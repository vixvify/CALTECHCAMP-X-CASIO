import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { PrismaClient } from '@/generated/prisma';

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
