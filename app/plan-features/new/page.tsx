"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NewPlanFeaturePage() {
  const router = useRouter()
  const [plans, setPlans] = useState([])
  const [formData, setFormData] = useState({
    planId: '',
    name: '',
    description: '',
  })

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch('/api/plans')
      if (response.ok) {
        const data = await response.json()
        setPlans(data)
      }
    }
    fetchPlans()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, planId: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/plan-features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        planId: parseInt(formData.planId),
      }),
    })
    if (response.ok) {
      router.push('/plan-features')
    } else {
      console.error('Failed to create plan feature')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Plan Feature</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select onValueChange={handleSelectChange} value={formData.planId}>
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
          name="name"
          placeholder="Feature Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Feature Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Button type="submit">Create Plan Feature</Button>
      </form>
    </div>
  )
}