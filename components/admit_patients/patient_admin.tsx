"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PatientAdmissionForm = () => {
  const router = useRouter();
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
    currentHospital: "",
    newHospital: "",
    contact: "",
    admissionDate: "",
  });
  const [showTransfer, setShowTransfer] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message on submit

    try {
      const {
        name,
        age,
        gender,
        diagnosis, // Updated from 'condition' to 'diagnosis'
        currentHospital,
        admissionDate,
        contact,
      } = patientData;

      // Basic validation
      if (
        !name ||
        !age ||
        !gender ||
        !diagnosis || // Updated from 'condition' to 'diagnosis'
        !currentHospital ||
        !admissionDate ||
        !contact
      ) {
        setErrorMessage("Please fill out all required fields.");
        return;
      }

      // Convert age and contact to integers
      const ageAsNumber = parseInt(age, 10);

      if (isNaN(ageAsNumber)) {
        setErrorMessage("Age and Contact must be valid numbers.");
        return;
      }

      // Prepare data for submission
      const dataToSubmit = {
        ...patientData,
        age: ageAsNumber, // Ensure age is a number
      };

      console.log("Submitting patient data:", dataToSubmit);

      // Post data to the API
      await axios.post("/api/patients", dataToSubmit, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Redirect on successful submission
      router.push("/hospital/D");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error details:", error.response?.data);
        setErrorMessage("Failed to submit the form. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Patient Details</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Patient Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={patientData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={patientData.age}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="diagnosis" className="block text-sm font-medium">
            Medical Diagnosis
          </label>
          <input
            id="diagnosis"
            name="diagnosis" // Updated from 'condition' to 'diagnosis'
            type="text"
            value={patientData.diagnosis} // Updated from 'condition' to 'diagnosis'
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="currentHospital"
            className="block text-sm font-medium"
          >
            Current Hospital
          </label>
          <input
            id="currentHospital"
            name="currentHospital"
            type="text"
            value={patientData.currentHospital}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium">
            Contact Number
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            value={patientData.contact}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="admissionDate" className="block text-sm font-medium">
            Admission Date
          </label>
          <input
            id="admissionDate"
            name="admissionDate"
            type="date"
            value={patientData.admissionDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="transferCheck"
            checked={showTransfer}
            onChange={() => setShowTransfer(!showTransfer)}
            className="rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-opacity-50"
          />
          <label htmlFor="transferCheck" className="text-sm font-medium">
            Transfer to another hospital?
          </label>
        </div>
        {showTransfer && (
          <div>
            <label htmlFor="newHospital" className="block text-sm font-medium">
              New Hospital
            </label>
            <input
              id="newHospital"
              name="newHospital"
              type="text"
              value={patientData.newHospital}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Admit Patient
        </button>
      </form>
    </div>
  );
};

export default PatientAdmissionForm;
