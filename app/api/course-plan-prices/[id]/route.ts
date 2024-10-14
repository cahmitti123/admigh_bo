import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const coursePlanPrice = await prisma.coursePlanPrice.findUnique({
    where: { id: parseInt(params.id) },
    include: { course: true, plan: true }
  })
  if (!coursePlanPrice) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(coursePlanPrice)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const coursePlanPrice = await prisma.coursePlanPrice.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(coursePlanPrice)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.coursePlanPrice.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}