"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditLeadPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [plans, setPlans] = useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    sexe: '',
    planId: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const [leadResponse, plansResponse] = await Promise.all([
        fetch(`/api/leads/${params.id}`),
        fetch('/api/plans')
      ])

      if (leadResponse.ok && plansResponse.ok) {
        const [lead, plansData] = await Promise.all([
          leadResponse.json(),
          plansResponse.json()
        ])

        setFormData({
          fullName: lead.fullName,
          phoneNumber: lead.phoneNumber,
          email: lead.email,
          address: lead.address,
          sexe: lead.sexe,
          planId: lead.planId.toString(),
        })
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
    const response = await fetch(`/api/leads/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        planId: parseInt(formData.planId),
      }),
    })
    if (response.ok) {
      router.push(`/leads/${params.id}`)
    } else {
      console.error('Failed to update lead')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Lead</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <Select onValueChange={(value) => handleSelectChange('sexe', value)} value={formData.sexe}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
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
        <Button type="submit">Update Lead</Button>
      </form>
    </div>
  )
}