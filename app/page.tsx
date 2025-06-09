"use client";

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hospital, Pill, Search, BookOpen, Activity, Bed, TestTube, Stethoscope } from "lucide-react"

const hospitals = [
  { 
    id: 1, 
    name: "Central Hospital", 
    city: "Downtown", 
    specialties: ["Cardiology", "Neurology", "Pediatrics"],
    primaryCare: [
      { name: "Dr. John Doe", image: "/placeholder.svg", sittingTime: "9:00 AM - 5:00 PM" },
      { name: "Dr. Jane Smith", image: "/placeholder.svg", sittingTime: "10:00 AM - 6:00 PM" },
    ]
  },
  { 
    id: 2, 
    name: "Riverside Medical Center", 
    city: "Westside", 
    specialties: ["Oncology", "Orthopedics", "Gastroenterology"],
    primaryCare: [
      { name: "Dr. Alice Johnson", image: "/placeholder.svg", sittingTime: "8:00 AM - 4:00 PM" },
      { name: "Dr. Bob Williams", image: "/placeholder.svg", sittingTime: "11:00 AM - 7:00 PM" },
    ]
  },
  { 
    id: 3, 
    name: "Sunnyvale General Hospital", 
    city: "Eastside", 
    specialties: ["Dermatology", "Endocrinology", "Pulmonology"],
    primaryCare: [
      { name: "Dr. Carol Brown", image: "/placeholder.svg", sittingTime: "9:30 AM - 5:30 PM" },
      { name: "Dr. David Lee", image: "/placeholder.svg", sittingTime: "7:00 AM - 3:00 PM" },
    ]
  },
]

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHospital, setSelectedHospital] = useState(null)

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Hospital className="h-6 w-6" />
          <span className="sr-only">Centralized Hospital System</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/hospital/a">
            Hospitals
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Medications
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Studies
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to the Centralized Hospital System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your one-stop platform for managing healthcare needs, booking appointments, and accessing medical information.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input 
                    className="max-w-lg flex-1" 
                    placeholder="Search hospitals by name, location, or specialty" 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Medication and Consumable Studies
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2" />
                    Interactive Study Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Explore interactive visualizations of medication efficacy and consumable usage patterns.</p>
                  <Button className="mt-4 bg-white text-purple-500 hover:bg-gray-100">Explore Studies</Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2" />
                    Real-time Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access up-to-date analytics on medication effectiveness and consumable inventory levels.</p>
                  <Button className="mt-4 bg-white text-green-500 hover:bg-gray-100">View Analytics</Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="mr-2" />
                    Medication Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Search for detailed information about medications prescribed by our network hospitals.</p>
                  <form className="mt-4 flex space-x-2">
                    <Input className="flex-1 bg-white text-gray-900" placeholder="Search medications" type="text" />
                    <Button className="bg-white text-orange-500 hover:bg-gray-100">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Find Hospitals and Book Appointments
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {filteredHospitals.map((hospital) => (
                <Card key={hospital.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <CardTitle>{hospital.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="mb-2">Location: {hospital.city}</p>
                    <p className="mb-4">Specialties: {hospital.specialties.join(", ")}</p>
                    <div className="flex justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Book Appointment</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Book an Appointment</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="specialist" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="specialist">Specialist</TabsTrigger>
                              <TabsTrigger value="primary">Primary Care</TabsTrigger>
                              <TabsTrigger value="opd">OPD</TabsTrigger>
                            </TabsList>
                            <TabsContent value="specialist">
                              <div className="space-y-2">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Specialist" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {hospital.specialties.map((specialty, index) => (
                                      <SelectItem key={index} value={specialty.toLowerCase()}>{specialty}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input type="date" />
                                <Button className="w-full">Book Specialist Appointment</Button>
                              </div>
                            </TabsContent>
                            <TabsContent value="primary">
                              <div className="space-y-2">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Primary Care Physician" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {hospital.primaryCare.map((doctor, index) => (
                                      <SelectItem key={index} value={doctor.name.toLowerCase()}>
                                        <div className="flex items-center">
                                          <Image
                                            src={doctor.image}
                                            alt={doctor.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full mr-2"
                                          />
                                          <div>
                                            <div>{doctor.name}</div>
                                            <div className="text-sm text-gray-500">{doctor.sittingTime}</div>
                                          </div>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input type="date" />
                                <Button className="w-full">Book Primary Care Appointment</Button>
                              </div>
                            </TabsContent>
                            <TabsContent value="opd">
                              <div className="space-y-2">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="general">General Medicine</SelectItem>
                                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                                    <SelectItem value="gynecology">Gynecology</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input type="date" />
                                <Button className="w-full">Book OPD Appointment</Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>{hospital.name} Details</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="beds" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="beds">Beds</TabsTrigger>
                              <TabsTrigger value="tests">Available Tests</TabsTrigger>
                              <TabsTrigger value="departments">Departments</TabsTrigger>
                            </TabsList>
                            <TabsContent value="beds">
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Available Beds</h3>
                                <ul className="list-disc list-inside">
                                  <li>General Ward: 50 (15 available)</li>
                                  <li>ICU: 20 (5 available)</li>
                                  <li>Pediatric Ward: 30 (10 available)</li>
                                  <li>Maternity Ward: 25 (8 available)</li>
                                </ul>
                              </div>
                            </TabsContent>
                            <TabsContent value="tests">
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Available Tests</h3>
                                <ul className="list-disc list-inside">
                                  <li>MRI</li>
                                  <li>CT Scan</li>
                                  <li>X-Ray</li>
                                  <li>Ultrasound</li>
                                  <li>Blood Tests</li>
                                  <li>ECG</li>
                                </ul>
                              </div>
                            </TabsContent>
                            <TabsContent value="departments">
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Departments and Specialists</h3>
                                <ul className="list-disc list-inside">
                                  {hospital.specialties.map((specialty, index) => (
                                    <li key={index}>{specialty}: Dr. {specialty.split(" ")[0]} Smith</li>
                                  ))}
                                </ul>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Sehat Sarv. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}