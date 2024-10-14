import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: { category: true }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <Link href="/courses/new" passHref>
        <Button className="mb-4">Add New Course</Button>
      </Link>
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="mb-2">
            <Link href={`/courses/${course.id}`}>
              {course.nameEnglish} - {course.category.categoryNameEnglish}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}