import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const plan = await prisma.plan.create({
    data: body,
  })
  return NextResponse.json(plan)
}

export async function GET() {
  const plans = await prisma.plan.findMany()
  return NextResponse.json(plans)
}