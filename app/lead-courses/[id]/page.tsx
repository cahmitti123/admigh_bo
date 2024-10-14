import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LeadCoursePage({ params }: { params: { id: string } }) {
  const leadCourse = await prisma.leadCourse.findUnique({
    where: { id: parseInt(params.id) },
    include: { lead: true, course: true }
  })

  if (!leadCourse) {
    return <div>Lead Course not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lead Course Details</h1>
      <p className="mb-2">Lead: {leadCourse.lead.fullName}</p>
      <p className="mb-2">Course: {leadCourse.course.nameEnglish}</p>
      <Link href={`/lead-courses/${leadCourse.id}/edit`} passHref>
        <Button className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" onClick={() => {}}>Delete</Button>
    </div>
  )
}