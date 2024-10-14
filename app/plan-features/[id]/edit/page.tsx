"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditPlanFeaturePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [plans, setPlans] = useState([])
  const [formData, setFormData] = useState({
    planId: '',
    name: '',
    description: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const [planFeatureResponse, plansResponse] = await Promise.all([
        fetch(`/api/plan-features/${params.id}`),
        fetch('/api/plans')
      ])

      if (planFeatureResponse.ok && plansResponse.ok) {
        const [planFeature, plansData] = await Promise.all([
          planFeatureResponse.json(),
          plansResponse.json()
        ])

        setFormData({
          planId: planFeature.planId.toString(),
          name: planFeature.name,
          description: planFeature.description,
        })
        setPlans(plansData)
      } else {
        console.error('Failed to fetch data')
      }
    }
    fetchData()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, planId: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/plan-features/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        planId: parseInt(formData.planId),
      }),
    })
    if (response.ok) {
      router.push(`/plan-features/${params.id}`)
    } else {
      console.error('Failed to update plan feature')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Plan Feature</h1>
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
        <Button type="submit">Update Plan Feature</Button>
      </form>
    </div>
  )
}