import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PATCH(req: NextRequest) {
  const data = await req.json();

  try {
    const { email, password } = data as {
      email: string;
      password: string;
    };
    const findEmail = await prisma.user.findFirst({ where: { email } });
    if (!findEmail) {
      return NextResponse.json({ msg: 'ไม่พบอีเมล' }, { status: 400 });
    }
    const { id } = findEmail;
    const newPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
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
