"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    nameEnglish: '',
    nameFrench: '',
    nameArabic: '',
    descriptionEnglish: '',
    descriptionFrench: '',
    descriptionArabic: '',
    imgUrl: '',
    categoryId: '',
  })

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/${params.id}`)
      if (response.ok) {
        const course = await response.json()
        setFormData({
          ...course,
          categoryId: course.categoryId.toString(),
        })
      } else {
        console.error('Failed to fetch course')
      }
    }
    const fetchCategories = async () => {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    }
    fetchCourse()
    fetchCategories()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, categoryId: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/courses/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, categoryId: parseInt(formData.categoryId) }),
    })
    if (response.ok) {
      router.push(`/courses/${params.id}`)
    } else {
      console.error('Failed to update course')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="nameEnglish"
          placeholder="Course Name (English)"
          value={formData.nameEnglish}
          onChange={handleChange}
          required
        />
        <Input
          name="nameFrench"
          placeholder="Course Name (French)"
          value={formData.nameFrench}
          onChange={handleChange}
          required
        />
        <Input
          name="nameArabic"
          placeholder="Course Name (Arabic)"
          value={formData.nameArabic}
          onChange={handleChange}
          required
        />
        <Textarea
          name="descriptionEnglish"
          placeholder="Course Description (English)"
          value={formData.descriptionEnglish}
          onChange={handleChange}
          required
        />
        <Textarea
          name="descriptionFrench"
          placeholder="Course Description (French)"
          value={formData.descriptionFrench}
          onChange={handleChange}
          required
        />
        <Textarea
          name="descriptionArabic"
          placeholder="Course Description (Arabic)"
          value={formData.descriptionArabic}
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
        <Select onValueChange={handleSelectChange} value={formData.categoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.categoryNameEnglish}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Update Course</Button>
      </form>
    </div>
  )
}