import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: parseInt(params.id) },
    include: { category: true }
  })
  if (!course) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(course)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const course = await prisma.course.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(course)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.course.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}