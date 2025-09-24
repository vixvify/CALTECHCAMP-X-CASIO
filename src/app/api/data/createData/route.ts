import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import { getToken } from 'next-auth/jwt';
import { userSchema } from '../../../../../validation';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();
  const token = await getToken({ req });
  const parsed = userSchema.safeParse(data);

  if (token) {
    return NextResponse.json({ msg: 'isRegis' }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json(
      { errors: (parsed as any).error.errors },
      { status: 400 },
    );
  }

  try {
    const { password, email } = data;
    const isRegis = await prisma.user.findUnique({ where: { email } });
    if (isRegis) {
      return NextResponse.json({ msg: 'isRegis' }, { status: 400 });
    }
    const newPass = await bcrypt.hash(password, 10);
    const newData = {
      ...data,
      password: newPass,
      stats: 'อยู่ระหว่างการคัดเลือก',
    };
    await prisma.user.create({ data: newData });
    return NextResponse.json({ msg: 'สมัครค่ายสำเร็จ' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
