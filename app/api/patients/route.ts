import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, age, gender, address, diagnosis, currentHospital, contact, admissionDate } = await req.json();

    // Validate the required fields
    if (!admissionDate) {
      return NextResponse.json({ error: 'Admission date is required' }, { status: 400 });
    }

    // Create the patient in the database
    const newPatient = await prisma.patient.create({
      data: {
        name,
        age,
        gender,
        address,
        diagnosis,
        currentHospital,
        contact,
        admissionDate: new Date(admissionDate),
      },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Failed to create patient:', error);
    return NextResponse.json({ error: 'An error occurred while creating the patient' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
    try {
      const patients = await prisma.patient.findMany();
      return NextResponse.json(patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      return NextResponse.error();
    }
  }


