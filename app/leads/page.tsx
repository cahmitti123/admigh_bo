import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    include: { plan: true }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <Link href="/leads/new" passHref>
        <Button className="mb-4">Add New Lead</Button>
      </Link>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id} className="mb-2">
            <Link href={`/leads/${lead.id}`}>
              {lead.fullName} - {lead.email} ({lead.plan.name})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}