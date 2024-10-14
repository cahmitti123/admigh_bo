"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditCoursePlanPricePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [plans, setPlans] = useState([])
  const [formData, setFormData] = useState({
    courseId: '',
    planId: '',
    price: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const [coursePlanPriceResponse, coursesResponse, plansResponse] = await Promise.all([
        fetch(`/api/course-plan-prices/${params.id}`),
        fetch('/api/courses'),
        fetch('/api/plans')
      ])

      if (coursePlanPriceResponse.ok && coursesResponse.ok && plansResponse.ok) {
        const [coursePlanPrice, coursesData, plansData] = await Promise.all([
          coursePlanPriceResponse.json(),
          coursesResponse.json(),
          plansResponse.json()
        ])

        setFormData({
          courseId: coursePlanPrice.courseId.toString(),
          planId: coursePlanPrice.planId.toString(),
          price: coursePlanPrice.price.toString(),
        })
        setCourses(coursesData)
        setPlans(plansData)
      } else {
        console.error('Failed to fetch data')
      }
    }
    fetchData()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/course-plan-prices/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        courseId: parseInt(formData.courseId),
        planId: parseInt(formData.planId),
        price: parseFloat(formData.price),
      }),
    })
    if (response.ok) {
      router.push(`/course-plan-prices/${params.id}`)
    } else {
      console.error('Failed to update course plan price')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Course Plan Price</h1>
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
        <Button type="submit">Update Course Plan Price</Button>
      </form>
    </div>
  )
}