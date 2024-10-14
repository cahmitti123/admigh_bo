import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: parseInt(params.id) },
    include: { plan: true, leadCourses: { include: { course: true } } }
  })
  if (!lead) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(lead)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const lead = await prisma.lead.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(lead)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.lead.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}