import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();

  try {
    const { password } = data;
    const newPass = await bcrypt.hash(password, 10);
    const newData = { ...data, password: newPass, stats: 'in_progress' };
    await prisma.user.create({ data: newData });
    return NextResponse.json({ msg: 'สมัครค่ายสำเร็จ' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
