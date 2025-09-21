import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json({ msg: 'กรุณาเข้าสู่ระบบ' }, { status: 401 });
  }
  try {
    const { password } = data;
    const newPass = await bcrypt.hash(password, 10);
    const newData = { ...data, password: newPass };
    await prisma.user.create({ data: newData });
    return NextResponse.json({ msg: 'สมัครค่ายสำเร็จ' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
