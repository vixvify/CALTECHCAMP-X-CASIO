import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  const prisma = new PrismaClient();
  const { id } = params;
}
