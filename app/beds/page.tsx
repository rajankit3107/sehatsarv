"use client";

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BedIcon, UserIcon, XIcon, ArrowRightIcon, LogOutIcon } from 'lucide-react'

type BedType = 'ICU' | 'General' | 'Pediatric'
type Bed = {
  id: number
  type: BedType
  isOccupied: boolean
  patientId: string | null
}

const initialBeds: Bed[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  type: i < 40 ? 'ICU' : i < 80 ? 'General' : 'Pediatric',
  isOccupied: false,
  patientId: null
}))

export default function Component() {
  const [beds, setBeds] = useState<Bed[]>(initialBeds)
  const [selectedType, setSelectedType] = useState<BedType>('ICU')
  const [patientQueue, setPatientQueue] = useState<string[]>([])
  const [newPatientId, setNewPatientId] = useState('')
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null)

  const addPatientToQueue = () => {
    if (newPatientId) {
      setPatientQueue(prevQueue => [...prevQueue, newPatientId])
      setNewPatientId('')
    }
  }

  const allocateBed = (bedId: number) => {
    if (patientQueue.length > 0) {
      const [nextPatient, ...remainingQueue] = patientQueue
      setBeds(beds.map(bed => 
        bed.id === bedId ? { ...bed, isOccupied: true, patientId: nextPatient } : bed
      ))
      setPatientQueue(remainingQueue)
    }
  }

  const addBed = () => {
    const newBed: Bed = {
      id: beds.length + 1,
      type: selectedType,
      isOccupied: false,
      patientId: null
    }
    setBeds(prevBeds => [...prevBeds, newBed])
  }

  const deallocateBed = (bedId: number) => {
    setBeds(beds.map(bed => 
      bed.id === bedId ? { ...bed, isOccupied: false, patientId: null } : bed
    ))
    setSelectedBed(null)
  }

  const movePatient = (bedId: number, newType: BedType) => {
    const bed = beds.find(b => b.id === bedId)
    if (bed && bed.patientId) {
      deallocateBed(bedId)
      const availableBed = beds.find(b => b.type === newType && !b.isOccupied)
      if (availableBed) {
        allocateBed(availableBed.id)
      } else {
        setPatientQueue(prevQueue => [bed.patientId!, ...prevQueue])
      }
    }
    setSelectedBed(null)
  }

  const dischargePatient = (bedId: number) => {
    deallocateBed(bedId)
  }

  const filteredBeds = beds.filter(bed => bed.type === selectedType)
  const availableBeds = filteredBeds.filter(bed => !bed.isOccupied).length
  const occupiedBeds = filteredBeds.length - availableBeds

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-3/4">
          <Tabs defaultValue="ICU" onValueChange={(value) => setSelectedType(value as BedType)}>
            <TabsList>
              <TabsTrigger value="ICU">ICU Beds</TabsTrigger>
              <TabsTrigger value="General">General Beds</TabsTrigger>
              <TabsTrigger value="Pediatric">Pediatric Beds</TabsTrigger>
            </TabsList>
            {(['ICU', 'General', 'Pediatric'] as BedType[]).map((type) => (
              <TabsContent key={type} value={type}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">Total Beds: {filteredBeds.length}</h2>
                  <p className="text-green-600 font-semibold">Available: {availableBeds}</p>
                  <p className="text-red-600 font-semibold">Occupied: {occupiedBeds}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-4">
                  {filteredBeds.map((bed) => (
                    <Dialog key={bed.id}>
                      <DialogTrigger asChild>
                        <div 
                          className={`p-2 border rounded cursor-pointer ${bed.isOccupied ? 'bg-red-100' : 'bg-green-100'}`}
                          onClick={() => setSelectedBed(bed)}
                        >
                          {bed.isOccupied ? (
                            <>
                              <BedIcon className="text-red-500" />
                              <p className="text-xs">Bed {bed.id}</p>
                              <UserIcon className="text-red-500" />
                              <p className="text-xs">{bed.patientId}</p>
                            </>
                          ) : (
                            <>
                              <BedIcon className="text-green-500" />
                              <p className="text-xs">Bed {bed.id}</p>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  allocateBed(bed.id)
                                }}
                                disabled={patientQueue.length === 0}
                              >
                                Book
                              </Button>
                            </>
                          )}
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Bed {bed.id} Options</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-2">
                          <Button onClick={() => deallocateBed(bed.id)} className="flex items-center">
                            <XIcon className="mr-2" /> Deallocate
                          </Button>
                          <Button onClick={() => movePatient(bed.id, bed.type === 'ICU' ? 'General' : 'ICU')} className="flex items-center">
                            <ArrowRightIcon className="mr-2" /> Move to {bed.type === 'ICU' ? 'General' : 'ICU'}
                          </Button>
                          <Button onClick={() => dischargePatient(bed.id)} className="flex items-center">
                            <LogOutIcon className="mr-2" /> Discharge
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
                <Button onClick={addBed}>Add {type} Bed</Button>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="lg:w-1/4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Patient Queue</h3>
            <div className="flex gap-2 mb-2">
              <Input 
                placeholder="Patient ID" 
                value={newPatientId} 
                onChange={(e) => setNewPatientId(e.target.value)}
              />
              <Button onClick={addPatientToQueue}>Add</Button>
            </div>
            <ul className="list-decimal pl-5">
              {patientQueue.map((patientId, index) => (
                <li key={index} className="mb-1">
                  {patientId}
                  {index === 0 && <span className="ml-2 text-green-600 font-semibold">(Next)</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}