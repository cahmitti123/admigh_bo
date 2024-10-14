import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CoursePlanPricesPage() {
  const coursePlanPrices = await prisma.coursePlanPrice.findMany({
    include: { course: true, plan: true }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Plan Prices</h1>
      <Link href="/course-plan-prices/new" passHref>
        <Button className="mb-4">Add New Course Plan Price</Button>
      </Link>
      <ul>
        {coursePlanPrices.map((cpp) => (
          <li key={cpp.id} className="mb-2">
            <Link href={`/course-plan-prices/${cpp.id}`}>
              {cpp.course.nameEnglish} - {cpp.plan.name}: ${cpp.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}