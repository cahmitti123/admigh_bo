"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NewCoursePlanPricePage() {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [plans, setPlans] = useState([])
  const [formData, setFormData] = useState({
    courseId: '',
    planId: '',
    price: '',
  })

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      }
    }
    const fetchPlans = async () => {
      const response = await fetch('/api/plans')
      if (response.ok) {
        const data = await response.json()
        setPlans(data)
      }
    }
    fetchCourses()
    fetchPlans()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/course-plan-prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        courseId: parseInt(formData.courseId),
        planId: parseInt(formData.planId),
        price: parseFloat(formData.price),
      }),
    })
    if (response.ok) {
      router.push('/course-plan-prices')
    } else {
      console.error('Failed to create course plan price')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Course Plan Price</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select onValueChange={(value) => handleSelectChange('courseId', value)} value={formData.courseId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id.toString()}>
                {course.nameEnglish}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleSelectChange('planId', value)} value={formData.planId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            {plans.map((plan) => (
              <SelectItem key={plan.id} value={plan.id.toString()}>
                {plan.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <Button type="submit">Create Course Plan Price</Button>
      </form>
    </div>
  )
}