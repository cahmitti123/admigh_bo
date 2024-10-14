import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CoursePlanPricePage({ params }: { params: { id: string } }) {
  const coursePlanPrice = await prisma.coursePlanPrice.findUnique({
    where: { id: parseInt(params.id) },
    include: { course: true, plan: true }
  })

  if (!coursePlanPrice) {
    return <div>Course Plan Price not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Plan Price Details</h1>
      <p className="mb-2">Course: {coursePlanPrice.course.nameEnglish}</p>
      <p className="mb-2">Plan: {coursePlanPrice.plan.name}</p>
      <p className="mb-2">Price: ${coursePlanPrice.price}</p><boltAction type="file" filePath="app/course-plan-prices/[id]/page.tsx">
      <Link href={`/course-plan-prices/${coursePlanPrice.id}/edit`} passHref>
        <Button className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" onClick={() => {}}>Delete</Button>
    </div>
  )
}