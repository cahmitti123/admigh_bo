import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PlanPage({ params }: { params: { id: string } }) {
  const plan = await prisma.plan.findUnique({
    where: { id: parseInt(params.id) },
    include: { planFeatures: true }
  })

  if (!plan) {
    return <div>Plan not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{plan.name}</h1>
      <p className="mb-2">{plan.description}</p>
      <p className="mb-2">Popular: {plan.isPopular ? 'Yes' : 'No'}</p>
      <img src={plan.imgUrl} alt={plan.name} className="mb-4 max-w-md" />
      <h2 className="text-xl font-semibold mb-2">Features:</h2>
      <ul className="list-disc pl-5 mb-4">
        {plan.planFeatures.map((feature) => (
          <li key={feature.id}>{feature.name}: {feature.description}</li>
        ))}
      </ul>
      <Link href={`/plans/${plan.id}/edit`} passHref>
        <Button className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" onClick={() => {}}>Delete</Button>
    </div>
  )
}