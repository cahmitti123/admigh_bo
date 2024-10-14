import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const leadCourse = await prisma.leadCourse.findUnique({
    where: { id: parseInt(params.id) },
    include: { lead: true, course: true }
  })
  if (!leadCourse) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(leadCourse)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const leadCourse = await prisma.leadCourse.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(leadCourse)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.leadCourse.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}