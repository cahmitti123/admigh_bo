import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LeadPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: parseInt(params.id) },
    include: { plan: true, leadCourses: { include: { course: true } } }
  })

  if (!lead) {
    return <div>Lead not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lead Details</h1>
      <p className="mb-2">Full Name: {lead.fullName}</p>
      <p className="mb-2">Phone Number: {lead.phoneNumber}</p>
      <p className="mb-2">Email: {lead.email}</p>
      <p className="mb-2">Address: {lead.address}</p>
      <p className="mb-2">Gender: {lead.sexe}</p>
      <p className="mb-2">Plan: {lead.plan.name}</p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Courses:</h2>
      <ul className="list-disc pl-5 mb-4">
        {lead.leadCourses.map((lc) => (
          <li key={lc.id}>{lc.course.nameEnglish}</li>
        ))}
      </ul>
      <Link href={`/leads/${lead.id}/edit`} passHref>
        <Button className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" onClick={() => {}}>Delete</Button>
    </div>
  )
}