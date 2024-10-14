import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const leadCourse = await prisma.leadCourse.create({
    data: body,
  })
  return NextResponse.json(leadCourse)
}

export async function GET() {
  const leadCourses = await prisma.leadCourse.findMany({
    include: { lead: true, course: true }
  })
  return NextResponse.json(leadCourses)
}