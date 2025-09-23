import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest, { params }: { params: any }) {
  const prisma = new PrismaClient();
  const { id } = params;
  const data = await req.json();

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
