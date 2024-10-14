import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PlansPage() {
  const plans = await prisma.plan.findMany()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plans</h1>
      <Link href="/plans/new" passHref>
        <Button className="mb-4">Add New Plan</Button>
      </Link>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id} className="mb-2">
            <Link href={`/plans/${plan.id}`}>
              {plan.name} {plan.isPopular && '(Popular)'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}