import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{category.categoryNameEnglish}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">English</h2>
        <p>{category.categoryDescriptionEnglish}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">French</h2>
        <p>{category.categoryDescriptionFrench}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Arabic</h2>
        <p>{category.categoryDescriptionArabic}</p>
      </div>
      <img src={category.imgUrl} alt={category.categoryNameEnglish} className="mb-4 max-w-md" />
      <Link href={`/categories/${category.id}/edit`} passHref>
        <Button className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" onClick={() => {}}>Delete</Button>
    </div>
  )
}