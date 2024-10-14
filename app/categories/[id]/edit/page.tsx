"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    categoryNameEnglish: '',
    categoryNameFrench: '',
    categoryNameArabic: '',
    categoryDescriptionEnglish: '',
    categoryDescriptionFrench: '',
    categoryDescriptionArabic: '',
    imgUrl: '',
  })

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`/api/categories/${params.id}`)
      if (response.ok) {
        const category = await response.json()
        setFormData(category)
      } else {
        console.error('Failed to fetch category')
      }
    }
    fetchCategory()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/categories/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      router.push(`/categories/${params.id}`)
    } else {
      console.error('Failed to update category')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="categoryNameEnglish"
          placeholder="Category Name (English)"
          value={formData.categoryNameEnglish}
          onChange={handleChange}
          required
        />
        <Input
          name="categoryNameFrench"
          placeholder="Category Name (French)"
          value={formData.categoryNameFrench}
          onChange={handleChange}
          required
        />
        <Input
          name="categoryNameArabic"
          placeholder="Category Name (Arabic)"
          value={formData.categoryNameArabic}
          onChange={handleChange}
          required
        />
        <Textarea
          name="categoryDescriptionEnglish"
          placeholder="Category Description (English)"
          value={formData.categoryDescriptionEnglish}
          onChange={handleChange}
          required
        />
        <Textarea
          name="categoryDescriptionFrench"
          placeholder="Category Description (French)"
          value={formData.categoryDescriptionFrench}
          onChange={handleChange}
          required
        />
        <Textarea
          name="categoryDescriptionArabic"
          placeholder="Category Description (Arabic)"
          value={formData.categoryDescriptionArabic}
          onChange={handleChange}
          required
        />
        <Input
          name="imgUrl"
          placeholder="Image URL"
          value={formData.imgUrl}
          onChange={handleChange}
          required
        />
        <Button type="submit">Update Category</Button>
      </form>
    </div>
  )
}