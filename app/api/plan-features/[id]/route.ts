import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const planFeature = await prisma.planFeature.findUnique({
    where: { id: parseInt(params.id) },
    include: { plan: true }
  })
  if (!planFeature) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(planFeature)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const planFeature = await prisma.planFeature.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(planFeature)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.planFeature.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}