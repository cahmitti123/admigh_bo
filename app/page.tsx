import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to the Admin Web Application
        </h1>
        <p className="text-2xl mb-8">
          Manage your courses, plans, and leads
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/categories" passHref>
            <Button className="w-full">Manage Categories</Button>
          </Link>
          <Link href="/courses" passHref>
            <Button className="w-full">Manage Courses</Button>
          </Link>
          <Link href="/plans" passHref>
            <Button className="w-full">Manage Plans</Button>
          </Link>
          <Link href="/course-plan-prices" passHref>
            <Button className="w-full">Manage Course Plan Prices</Button>
          </Link>
          <Link href="/plan-features" passHref>
            <Button className="w-full">Manage Plan Features</Button>
          </Link>
          <Link href="/leads" passHref>
            <Button className="w-full">Manage Leads</Button>
          </Link>
          <Link href="/lead-courses" passHref>
            <Button className="w-full">Manage Lead Courses</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}