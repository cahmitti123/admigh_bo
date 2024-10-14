"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditLeadCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [leads, setLeads] = useState([])
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState({
    leadId: '',
    courseId: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const [leadCourseResponse, leadsResponse, coursesResponse] = await Promise.all([
        fetch(`/api/lead-courses/${params.id}`),
        fetch('/api/leads'),
        fetch('/api/courses')
      ])

      if (leadCourseResponse.ok && leadsResponse.ok && coursesResponse.ok) {
        const [leadCourse, leadsData, coursesData] = await Promise.all([
          leadCourseResponse.json(),
          leadsResponse.json(),
          coursesResponse.json()
        ])

        setFormData({
          leadId: leadCourse.leadId.toString(),
          courseId: leadCourse.courseId.toString(),
        })
        setLeads(leadsData)
        setCourses(coursesData)
      } else {
        console.error('Failed to fetch data')
      }
    }
    fetchData()
  }, [params.id])

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/lead-courses/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: parseInt(formData.leadId),
        courseId: parseInt(formData.courseId),
      }),
    })
    if (response.ok) {
      router.push(`/lead-courses/${params.id}`)
    } else {
      console.error('Failed to update lead course')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Lead Course</h1>
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
        <Button type="submit">Update Lead Course</Button>
      </form>
    </div>
  )
}