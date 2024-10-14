import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const plan = await prisma.plan.findUnique({
    where: { id: parseInt(params.id) },
    include: { planFeatures: true }
  })
  if (!plan) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(plan)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const plan = await prisma.plan.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  return NextResponse.json(plan)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.plan.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}