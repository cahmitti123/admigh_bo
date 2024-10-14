"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NewLeadCoursePage() {
  const router = useRouter()
  const [leads, setLeads] = useState([])
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState({
    leadId: '',
    courseId: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const [leadsResponse, coursesResponse] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/courses')
      ])

      if (leadsResponse.ok && coursesResponse.ok) {
        const [leadsData, coursesData] = await Promise.all([
          leadsResponse.json(),
          coursesResponse.json()
        ])

        setLeads(leadsData)
        setCourses(coursesData)
      } else {
        console.error('Failed to fetch data')
      }
    }
    fetchData()
  }, [])

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/lead-courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: parseInt(formData.leadId),
        courseId: parseInt(formData.courseId),
      }),
    })
    if (response.ok) {
      router.push('/lead-courses')
    } else {
      console.error('Failed to create lead course')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Lead Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select onValueChange={(value) => handleSelectChange('leadId', value)} value={formData.leadId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a lead" />
          </SelectTrigger>
          <SelectContent>
            {leads.map((lead) => (
              <SelectItem key={lead.id} value={lead.id.toString()}>
                {lead.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Button type="submit">Create Lead Course</Button>
      </form>
    </div>
  )
}