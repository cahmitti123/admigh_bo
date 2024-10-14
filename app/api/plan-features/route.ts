import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const planFeature = await prisma.planFeature.create({
    data: body,
  })
  return NextResponse.json(planFeature)
}

export async function GET() {
  const planFeatures = await prisma.planFeature.findMany({
    include: { plan: true }
  })
  return NextResponse.json(planFeatures)
}