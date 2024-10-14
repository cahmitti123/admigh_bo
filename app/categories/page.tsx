import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Link href="/categories/new" passHref>
        <Button className="mb-4">Add New Category</Button>
      </Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <Link href={`/categories/${category.id}`}>
              {category.categoryNameEnglish}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}