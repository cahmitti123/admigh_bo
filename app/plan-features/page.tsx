import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PlanFeaturesPage() {
  const planFeatures = await prisma.planFeature.findMany({
    include: { plan: true }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plan Features</h1>
      <Link href="/plan-features/new" passHref>
        <Button className="mb-4">Add New Plan Feature</Button>
      </Link>
      <ul>
        {planFeatures.map((feature) => (
          <li key={feature.id} className="mb-2">
            <Link href={`/plan-features/${feature.id}`}>
              {feature.plan.name}: {feature.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}