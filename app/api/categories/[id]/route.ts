import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!category) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(category)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const category = await prisma.category.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(category)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.category.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}