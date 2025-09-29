import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getToken } from 'next-auth/jwt';

export async function PUT(req: NextRequest, { params }: { params: any }) {
  const { id } = params;
  const data = await req.json();
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ msg: 'not found' }, { status: 404 });
  }

  delete data['id'];
  const { password } = data;
  const newPass = await bcrypt.hash(password, 10);
  const newData = { ...data, password: newPass };

  try {
    await prisma.user.update({ where: { id }, data: newData });
    return NextResponse.json({ msg: 'แก้ไขสำเร็จ' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
