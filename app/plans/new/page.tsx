"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

export default function NewPlanPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imgUrl: '',
    isPopular: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, isPopular: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      router.push('/plans')
    } else {
      console.error('Failed to create plan')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Plan</h1>
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
        <Button type="submit">Create Plan</Button>
      </form>
    </div>
  )
}