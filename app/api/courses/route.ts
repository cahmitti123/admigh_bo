import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const course = await prisma.course.create({
    data: body,
  })
  return NextResponse.json(course)
}

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { category: true }
  })
  return NextResponse.json(courses)
}