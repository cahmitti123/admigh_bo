import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PlanFeaturePage({ params }: { params: { id: string } }) {
  const planFeature = await prisma.planFeature.findUnique({
    where: { id: parseInt(params.id) },
    include: { plan: true }
  })

  if (!planFeature) {
    return <div>Plan Feature not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plan Feature Details</h1>
      <p className="mb-2">Plan: {planFeature.plan.name}</p>
      <p className="mb-2">Feature Name: {planFeature.name}</p>
      <p className="mb-2">Description: {planFeature.description}</p>
      <Link href={`/plan-features/${planFeature.id}/edit`} passHref>
        <Button className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" onClick={() => {}}>Delete</Button>
    </div>
  )
}