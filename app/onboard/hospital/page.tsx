'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PlusCircle, Trash2, Edit, Save, Upload, User, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HospitalOnboarding() {
  const [step, setStep] = useState(1)
  const [hospitalData, setHospitalData] = useState({
    name: '',
    logo: '',
    address: {
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    contactDetails: {
      phone: '',
      email: '',
      website: ''
    },
    ambulanceService: false,
    ambulanceContact: '',
    wards: [],
    departments: [],
    facilities: [],
    doctors: []
  })
  const [currentWard, setCurrentWard] = useState({ name: '', beds: '' })
  const [currentDepartment, setCurrentDepartment] = useState('')
  const [currentFacility, setCurrentFacility] = useState('')
  const [currentDoctor, setCurrentDoctor] = useState({ name: '', department: '' })
  const [editIndex, setEditIndex] = useState(-1)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDoctorDialogOpen, setIsDoctorDialogOpen] = useState(false)
  const [expandedDepartment, setExpandedDepartment] = useState(null)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setHospitalData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setHospitalData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSwitchChange = (checked) => {
    setHospitalData(prev => ({ ...prev, ambulanceService: checked }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHospitalData(prev => ({ ...prev, logo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addWard = () => {
    if (currentWard.name && currentWard.beds) {
      if (editIndex > -1) {
        setHospitalData(prev => ({
          ...prev,
          wards: prev.wards.map((ward, index) => 
            index === editIndex ? currentWard : ward
          )
        }))
        setEditIndex(-1)
      } else {
        setHospitalData(prev => ({
          ...prev,
          wards: [...prev.wards, currentWard]
        }))
      }
      setCurrentWard({ name: '', beds: '' })
      setIsEditDialogOpen(false)
    }
  }

  const addDepartment = () => {
    if (currentDepartment) {
      if (editIndex > -1) {
        setHospitalData(prev => ({
          ...prev,
          departments: prev.departments.map((dept, index) => 
            index === editIndex ? currentDepartment : dept
          )
        }))
        setEditIndex(-1)
      } else {
        setHospitalData(prev => ({
          ...prev,
          departments: [...prev.departments, currentDepartment]
        }))
      }
      setCurrentDepartment('')
      setIsEditDialogOpen(false)
    }
  }

  const addFacility = () => {
    if (currentFacility) {
      if (editIndex > -1) {
        setHospitalData(prev => ({
          ...prev,
          facilities: prev.facilities.map((facility, index) => 
            index === editIndex ? currentFacility : facility
          )
        }))
        setEditIndex(-1)
      } else {
        setHospitalData(prev => ({
          ...prev,
          facilities: [...prev.facilities, currentFacility]
        }))
      }
      setCurrentFacility('')
      setIsEditDialogOpen(false)
    }
  }

  const addDoctor = () => {
    if (currentDoctor.name && currentDoctor.department) {
      if (editIndex > -1) {
        setHospitalData(prev => ({
          ...prev,
          doctors: prev.doctors.map((doctor, index) => 
            index === editIndex ? currentDoctor : doctor
          )
        }))
        setEditIndex(-1)
      } else {
        setHospitalData(prev => ({
          ...prev,
          doctors: [...prev.doctors, currentDoctor]
        }))
      }
      setCurrentDoctor({ name: '', department: '' })
      setIsDoctorDialogOpen(false)
    }
  }

  const editItem = (index, type) => {
    setEditIndex(index)
    setIsEditDialogOpen(true)
    if (type === 'wards') {
      setCurrentWard(hospitalData.wards[index])
    } else if (type === 'departments') {
      setCurrentDepartment(hospitalData.departments[index])
    } else if (type === 'facilities') {
      setCurrentFacility(hospitalData.facilities[index])
    }
  }

  const editDoctor = (index) => {
    setEditIndex(index)
    setCurrentDoctor(hospitalData.doctors[index])
    setIsDoctorDialogOpen(true)
  }

  const deleteItem = (index, type) => {
    setHospitalData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const deleteDoctor = (index) => {
    setHospitalData(prev => ({
      ...prev,
      doctors: prev.doctors.filter((_, i) => i !== index)
    }))
  }

  const getDoctorCountByDepartment = (department) => {
    return hospitalData.doctors.filter(doctor => doctor.department === department).length
  }

  const toggleDepartment = (department) => {
    setExpandedDepartment(expandedDepartment === department ? null : department)
  }

  const editDepartment = (index) => {
    setEditIndex(index)
    setCurrentDepartment(hospitalData.departments[index])
    setIsEditDialogOpen(true)
  }

  const deleteDepartment = (index) => {
    setHospitalData(prev => ({
      ...prev,
      departments: prev.departments.filter((_, i) => i !== index),
      doctors: prev.doctors.filter(doctor => doctor.department !== prev.departments[index])
    }))
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Hospital Name</Label>
              <Input id="name" name="name" value={hospitalData.name} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="logo">Hospital Logo</Label>
              <div className="flex items-center space-x-2">
                <Button onClick={() => fileInputRef.current.click()} variant="outline">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
                <Input
                  type="file"
                  id="logo"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleLogoUpload}
                  accept="image/*"
                />
                {hospitalData.logo && (
                  <img src={hospitalData.logo} alt="Hospital Logo" className="h-10 w-10 object-cover rounded" />
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="address.city">City</Label>
              <Input id="address.city" name="address.city" value={hospitalData.address.city} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="address.state">State</Label>
              <Input id="address.state" name="address.state" value={hospitalData.address.state} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="address.pincode">Pincode</Label>
              <Input id="address.pincode" name="address.pincode" value={hospitalData.address.pincode} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="address.landmark">Landmark</Label>
              <Input id="address.landmark" name="address.landmark" value={hospitalData.address.landmark} onChange={handleInputChange} />
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="contactDetails.phone">Phone</Label>
              <Input id="contactDetails.phone" name="contactDetails.phone" value={hospitalData.contactDetails.phone} onChange={handleInputChange} placeholder="+91" />
            </div>
            <div>
              <Label htmlFor="contactDetails.email">Email</Label>
              <Input id="contactDetails.email" name="contactDetails.email" value={hospitalData.contactDetails.email} onChange={handleInputChange} type="email" />
            </div>
            <div>
              <Label htmlFor="contactDetails.website">Website</Label>
              <Input id="contactDetails.website" name="contactDetails.website" value={hospitalData.contactDetails.website} onChange={handleInputChange} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="ambulanceService" checked={hospitalData.ambulanceService} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="ambulanceService">Ambulance Service</Label>
            </div>
            {hospitalData.ambulanceService && (
              <div>
                <Label htmlFor="ambulanceContact">Ambulance Contact</Label>
                <Input id="ambulanceContact" name="ambulanceContact" value={hospitalData.ambulanceContact} onChange={handleInputChange} placeholder="+91" />
              </div>
            )}
          </motion.div>
        )
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Ward</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editIndex > -1 ? 'Edit Ward' : 'Add New Ward'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="wardName">Ward Name</Label>
                    <Input id="wardName" value={currentWard.name} onChange={(e) => setCurrentWard(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="bedCount">Number of Beds</Label>
                    <Input id="bedCount" type="number" value={currentWard.beds} onChange={(e) => setCurrentWard(prev => ({ ...prev, beds: e.target.value }))} />
                  </div>
                  <Button onClick={addWard}>{editIndex > -1 ? 'Update' : 'Add'} Ward</Button>
                </div>
              </DialogContent>
            </Dialog>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Added Wards:</h3>
              {hospitalData.wards.map((ward, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between bg-muted p-2 rounded mb-2"
                >
                  <span>{ward.name} - {ward.beds} beds</span>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => editItem(index, 'wards')}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem(index, 'wards')}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Department</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editIndex > -1 ? 'Edit Department' : 'Add New Department'}</DialogTitle>
                </DialogHeader>
                <div>
                  <Label htmlFor="department">Department Name</Label>
                  <Input id="department" value={currentDepartment} onChange={(e) => setCurrentDepartment(e.target.value)} />
                </div>
                <Button onClick={addDepartment}>{editIndex > -1 ? 'Update' : 'Add'} Department</Button>
              </DialogContent>
            </Dialog>
            <Dialog open={isDoctorDialogOpen} onOpenChange={setIsDoctorDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editIndex > -1 ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="doctorName">Doctor Name</Label>
                    <Input id="doctorName" value={currentDoctor.name} onChange={(e) => setCurrentDoctor(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="doctorDepartment">Department</Label>
                    <select
                      id="doctorDepartment"
                      value={currentDoctor.department}
                      onChange={(e) => setCurrentDoctor(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Department</option>
                      {hospitalData.departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={addDoctor}>{editIndex > -1 ? 'Update' : 'Add'} Doctor</Button>
                </div>
              </DialogContent>
            </Dialog>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Departments and Doctors:</h3>
              {hospitalData.departments.map((dept, index) => (
                <Collapsible
                  key={index}
                  open={expandedDepartment === dept}
                  onOpenChange={() => toggleDepartment(dept)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-between p-2"
                    >
                      <span>{dept} - {getDoctorCountByDepartment(dept)} doctors</span>
                      {expandedDepartment === dept ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Doctors</span>
                      <div>
                        <Button variant="ghost" size="icon" onClick={() => editDepartment(index)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteDepartment(index)}><Trash2 className="h-4 w-4" /></Button>
                        <Button size="sm" onClick={() => {
                          setCurrentDoctor({ name: '', department: dept });
                          setIsDoctorDialogOpen(true);
                        }}>
                          <PlusCircle className="h-4 w-4 mr-2" /> Add Doctor
                        </Button>
                      </div>
                    </div>
                    {hospitalData.doctors.filter(doctor => doctor.department === dept).map((doctor, doctorIndex) => (
                      <div key={doctorIndex} className="flex items-center justify-between pl-4 py-1">
                        <span>{doctor.name}</span>
                        <div>
                          <Button variant="ghost" size="icon" onClick={() => editDoctor(hospitalData.doctors.indexOf(doctor))}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteDoctor(hospitalData.doctors.indexOf(doctor))}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </motion.div>
        )
      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Facility</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editIndex > -1 ? 'Edit Facility' : 'Add New Facility'}</DialogTitle>
                </DialogHeader>
                <div>
                  <Label htmlFor="facility">Facility Name</Label>
                  <Input id="facility" value={currentFacility} onChange={(e) => setCurrentFacility(e.target.value)} />
                </div>
                <Button onClick={addFacility}>{editIndex > -1 ? 'Update' : 'Add'} Facility</Button>
              </DialogContent>
            </Dialog>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Added Facilities:</h3>
              {hospitalData.facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between bg-muted p-2 rounded mb-2"
                >
                  <span>{facility}</span>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => editItem(index, 'facilities')}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem(index, 'facilities')}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      case 6:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">Hospital Summary</h2>
            <div>
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <p>Name: {hospitalData.name}</p>
              {hospitalData.logo && <img src={hospitalData.logo} alt="Hospital Logo" className="h-20 w-20 object-cover rounded mt-2" />}
              <p>Address: {hospitalData.address.city}, {hospitalData.address.state}, {hospitalData.address.pincode}</p>
              <p>Landmark: {hospitalData.address.landmark}</p>
              <p>Phone: {hospitalData.contactDetails.phone}</p>
              <p>Email: {hospitalData.contactDetails.email}</p>
              <p>Website: {hospitalData.contactDetails.website}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ambulance Service</h3>
              <p>{hospitalData.ambulanceService ? `Available (Contact: ${hospitalData.ambulanceContact})` : 'Not Available'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Wards and Beds</h3>
              {hospitalData.wards.map((ward, index) => (
                <p key={index}>{ward.name}: {ward.beds} beds</p>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Departments and Doctors</h3>
              {hospitalData.departments.map((dept, index) => (
                <div key={index}>
                  <p>{dept} - {getDoctorCountByDepartment(dept)} doctors</p>
                  <ul className="list-disc list-inside pl-4">
                    {hospitalData.doctors.filter(doctor => doctor.department === dept).map((doctor, doctorIndex) => (
                      <li key={doctorIndex}>{doctor.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Facilities</h3>
              {hospitalData.facilities.map((facility, index) => (
                <p key={index}>{facility}</p>
              ))}
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Hospital Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={`${step}`} onValueChange={(value) => setStep(parseInt(value))} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="1">Basic Info</TabsTrigger>
              <TabsTrigger value="2">Contact</TabsTrigger>
              <TabsTrigger value="3">Wards</TabsTrigger>
              <TabsTrigger value="4">Departments</TabsTrigger>
              <TabsTrigger value="5">Facilities</TabsTrigger>
              <TabsTrigger value="6">Summary</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value={`${step}`} className="mt-4">
                {renderStep()}
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setStep(prev => Math.max(1, prev - 1))} disabled={step === 1}>
            Previous
          </Button>
          <Button onClick={() => setStep(prev => Math.min(6, prev + 1))} disabled={step === 6}>
            {step === 5 ? 'Review' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}