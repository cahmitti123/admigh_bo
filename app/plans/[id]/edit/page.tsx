"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

export default function EditPlanPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imgUrl: '',
    isPopular: false,
  })

  useEffect(() => {
    const fetchPlan = async () => {
      const response = await fetch(`/api/plans/${params.id}`)
      if (response.ok) {
        const plan = await response.json()
        setFormData(plan)
      } else {
        console.error('Failed to fetch plan')
      }
    }
    fetchPlan()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, isPopular: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/plans/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      router.push(`/plans/${params.id}`)
    } else {
      console.error('Failed to update plan')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Plan Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Plan Description"
          value={formData.description}
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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPopular"
            checked={formData.isPopular}
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="isPopular"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Popular Plan
          </label>
        </div>
        <Button type="submit">Update Plan</Button>
      </form>
    </div>
  )
}