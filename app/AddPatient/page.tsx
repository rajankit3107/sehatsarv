"use client";
import Link from "next/link";
import PatientAdmissionForm from "../../components/admit_patients/patient_admin";
``;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">SehatSarv</div>
          <div className="space-x-4">
            <Link href="/hospital/D" className="hover:text-blue-200">
              Back to Dashboard
            </Link>
            <Link href="/admit" className="hover:text-blue-200">
              Admit Patients
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold mb-6">Patients Admit</h1>
        <PatientAdmissionForm />
      </main>
    </div>
  );
}
