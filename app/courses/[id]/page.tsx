import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: parseInt(params.id) },
    include: { category: true }
  })

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{course.nameEnglish}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">English</h2>
        <p>{course.descriptionEnglish}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">French</h2>
        <p>{course.descriptionFrench}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Arabic</h2>
        <p>{course.descriptionArabic}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Category</h2>
        <p>{course.category.categoryNameEnglish}</p>
      </div>
      <img src={course.imgUrl} alt={course.nameEnglish} className="mb-4 max-w-md" />
      <Link href={`/courses/${course.id}/edit`} passHref>
        <Button className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" onClick={() => {}}>Delete</Button>
    </div>
  )
}