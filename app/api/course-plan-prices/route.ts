import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const coursePlanPrice = await prisma.coursePlanPrice.create({
    data: body,
  })
  return NextResponse.json(coursePlanPrice)
}

export async function GET() {
  const coursePlanPrices = await prisma.coursePlanPrice.findMany({
    include: { course: true, plan: true }
  })
  return NextResponse.json(coursePlanPrices)
}