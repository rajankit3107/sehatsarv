'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, UserPlus, X, Edit } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Patient = {
  id: string
  name: string
  age: number
  gender: string
  contactNumber: string
  priority: 'Normal' | 'Emergency'
  symptoms: string
  specialist: string
}

type Specialist = {
  name: string
  department: string
}

const specialists: Specialist[] = [
  { name: "Dr. Smith", department: "Cardiology" },
  { name: "Dr. Johnson", department: "Neurology" },
  { name: "Dr. Williams", department: "Orthopedics" },
  { name: "Dr. Brown", department: "Pediatrics" },
  { name: "Dr. Jones", department: "Dermatology" },
]

export default function Component() {
  const [normalQueue, setNormalQueue] = useState<Patient[]>([])
  const [emergencyQueue, setEmergencyQueue] = useState<Patient[]>([])
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    name: '',
    age: 0,
    gender: '',
    contactNumber: '',
    priority: 'Normal',
    symptoms: '',
    specialist: ''
  })
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [specialistCounts, setSpecialistCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    updateSpecialistCounts()
  }, [normalQueue, emergencyQueue])

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewPatient(prev => ({ ...prev, [name]: value }))
  }

  const handlePriorityChange = (value: 'Normal' | 'Emergency') => {
    setNewPatient(prev => ({ ...prev, priority: value }))
  }

  const handleSpecialistChange = (value: string) => {
    setNewPatient(prev => ({ ...prev, specialist: value }))
  }

  const handleAddPatient = () => {
    const patient: Patient = { ...newPatient, id: generateUniqueId() }
    if (patient.priority === 'Emergency') {
      setEmergencyQueue(prev => [...prev, patient])
    } else {
      setNormalQueue(prev => [...prev, patient])
    }
    setNewPatient({
      name: '',
      age: 0,
      gender: '',
      contactNumber: '',
      priority: 'Normal',
      symptoms: '',
      specialist: ''
    })
    updateSpecialistCounts()
  }

  const handleRemovePatient = (queue: 'Normal' | 'Emergency', id: string) => {
    if (queue === 'Normal') {
      setNormalQueue(prev => prev.filter(patient => patient.id !== id))
    } else {
      setEmergencyQueue(prev => prev.filter(patient => patient.id !== id))
    }
    updateSpecialistCounts()
  }

  const handleUpdatePatient = (updatedPatient: Patient) => {
    const updateQueue = (queue: Patient[]) =>
      queue.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient)

    setNormalQueue(updateQueue)
    setEmergencyQueue(updateQueue)
    setSelectedPatient(updatedPatient)
    setEditMode(false)
    updateSpecialistCounts()
  }

  const updateSpecialistCounts = () => {
    const counts: Record<string, number> = {}
    specialists.forEach(specialist => {
      counts[specialist.name] = [...normalQueue, ...emergencyQueue].filter(
        patient => patient.specialist === specialist.name
      ).length
    })
    setSpecialistCounts(counts)
  }

  const totalAppointments = normalQueue.length + emergencyQueue.length

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 p-4">OPD Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Dashboard Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Total Appointments</h3>
                  <p className="text-3xl font-bold">{totalAppointments}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Waiting List</h3>
                  <div className="flex space-x-4 items-center">
                    <p className='bg-green-100 text-green-500 px-4 py-2 rounded-lg'>Normal: {normalQueue.length}</p>
                    <p className="bg-red-100 text-red-500 px-4 py-2 rounded-lg">Emergency: {emergencyQueue.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>Add New Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={newPatient.name} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" value={newPatient.age} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" name="gender" value={newPatient.gender} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input id="contactNumber" name="contactNumber" value={newPatient.contactNumber} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    value={newPatient.symptoms}
                    onChange={handleInputChange}
                    className="w-full h-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Describe the patient's symptoms..."
                  />
                </div>
                <div>
                  <Label>Priority</Label>
                  <RadioGroup value={newPatient.priority} onValueChange={handlePriorityChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Normal" id="normal" />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Emergency" id="emergency" />
                      <Label htmlFor="emergency">Emergency</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="specialist">Assign Specialist</Label>
                  <Select onValueChange={handleSpecialistChange} value={newPatient.specialist}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a specialist" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialists.map((specialist) => (
                        <SelectItem key={specialist.name} value={specialist.name}>
                          {specialist.name} ({specialist.department}) - {specialistCounts[specialist.name] || 0} patients
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" onClick={handleAddPatient}>
                  <UserPlus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Specialist Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {specialists.map((specialist) => (
                  <div key={specialist.name} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
                    <span>{specialist.name} ({specialist.department})</span>
                    <span className="font-semibold">{specialistCounts[specialist.name] || 0} patients</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                Emergency Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {emergencyQueue.map((patient, index) => (
                  <div key={patient.id} className="flex justify-between items-center mb-2 p-2 bg-red-100 rounded">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0" onClick={() => {
                          setSelectedPatient(patient)
                          setEditMode(false)
                        }}>
                          <span className="font-bold">{index + 1}. </span>
                          {patient.name} (ID: {patient.id})
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <PatientDetails 
                          patient={selectedPatient} 
                          specialists={specialists}
                          specialistCounts={specialistCounts}
                          onUpdatePatient={handleUpdatePatient}
                          editMode={editMode}
                          setEditMode={setEditMode}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="sm" onClick={() => handleRemovePatient('Emergency', patient.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Normal Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {normalQueue.map((patient, index) => (
                  <div key={patient.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0" onClick={() => {
                          setSelectedPatient(patient)
                          setEditMode(false)
                        }}>
                          <span className="font-bold">{index + 1}. </span>
                          {patient.name} (ID: {patient.id})
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <PatientDetails 
                          patient={selectedPatient} 
                          specialists={specialists}
                          specialistCounts={specialistCounts}
                          onUpdatePatient={handleUpdatePatient}
                          editMode={editMode}
                          setEditMode={setEditMode}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="sm" onClick={() => handleRemovePatient('Normal', patient.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PatientDetails({ 
  patient, 
  specialists, 
  specialistCounts,
  onUpdatePatient,
  editMode,
  setEditMode
}: { 
  patient: Patient | null, 
  specialists: Specialist[], 
  specialistCounts: Record<string, number>,
  onUpdatePatient: (patient: Patient) => void,
  editMode: boolean,
  setEditMode: (mode: boolean) => void
}) {
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null)

  useEffect(() => {
    setEditedPatient(patient)
  }, [patient])

  if (!editedPatient) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedPatient(prev => ({ ...prev!, [name]: value }))
  }

  const handleSpecialistChange = (value: string) => {
    setEditedPatient(prev => ({ ...prev!, specialist: value }))
  }

  const handleSave = () => {
    onUpdatePatient(editedPatient)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Patient Details</DialogTitle>
        <DialogDescription>ID: {editedPatient.id}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={editedPatient.name}
            onChange={handleInputChange}
            className="col-span-3"
            readOnly={!editMode}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="age" className="text-right">
            Age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={editedPatient.age}
            onChange={handleInputChange}
            className="col-span-3"
            readOnly={!editMode}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gender" className="text-right">
            Gender
          </Label>
          <Input
            id="gender"
            name="gender"
            value={editedPatient.gender}
            onChange={handleInputChange}
            className="col-span-3"
            readOnly={!editMode}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="contact" className="text-right">
            Contact
          </Label>
          <Input
            id="contact"
            name="contactNumber"
            value={editedPatient.contactNumber}
            onChange={handleInputChange}
            className="col-span-3"
            readOnly={!editMode}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="priority" className="text-right">
            Priority
          </Label>
          <Input id="priority" value={editedPatient.priority} className="col-span-3" readOnly />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="symptoms" className="text-right">
            Symptoms
          </Label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={editedPatient.symptoms}
            onChange={handleInputChange}
            className="col-span-3 w-full h-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            readOnly={!editMode}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialist" className="text-right">
            Specialist
          </Label>
          {editMode ? (
            <Select onValueChange={handleSpecialistChange} value={editedPatient.specialist} disabled={!editMode}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a specialist" />
              </SelectTrigger>
              <SelectContent>
                {specialists.map((specialist) => (
                  <SelectItem key={specialist.name} value={specialist.name}>
                    {specialist.name} ({specialist.department}) - {specialistCounts[specialist.name] || 0} patients
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input id="specialist" value={editedPatient.specialist} className="col-span-3" readOnly />
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        {editMode ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setEditMode(true)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        )}
      </div>
    </>
  )
}