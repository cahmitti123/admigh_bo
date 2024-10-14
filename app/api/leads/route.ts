import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const lead = await prisma.lead.create({
    data: body,
  })
  return NextResponse.json(lead)
}

export async function GET() {
  const leads = await prisma.lead.findMany({
    include: { plan: true }
  })
  return NextResponse.json(leads)
}