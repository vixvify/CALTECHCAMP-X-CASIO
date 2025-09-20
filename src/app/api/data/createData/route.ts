import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { PrismaClient } from '@/generated/prisma';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();

  if (!data) {
    return NextResponse.json({ msg: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
  }
  try {
    await prisma.form.create({ data });
    return NextResponse.json({ msg: 'สมัครสำเร็จ' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
