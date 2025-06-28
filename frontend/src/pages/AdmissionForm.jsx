// components/AdmissionForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    class: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    guardianType: "",
    guardianName: "",
    guardianRelation: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianOccupation: "",
    guardianAddress: "",
    guardianPhoto: null,
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      await axios.post("http://localhost:5000/api/admission", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-8 shadow-md bg-white rounded-md space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold">Online Admission</h2>

      {/* Basic Details */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-3">Basic Details</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <select
            name="class"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Class</option>
            <option value="B.Sc">B.Sc</option>
            <option value="B.Com">B.Com</option>
            <option value="BA">BA</option>
                  </select>
                   <select
            name="Combination"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Combination</option>
            <option value="B.Sc">CBZ</option>
            <option value="B.Com">PCM</option>
                      <option value="BA">PMCS</option>
                      <option value="BA">BA</option>
                      <option value="BA">General</option>
          </select>
          <input
            name="firstName"
            required
            placeholder="First Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="gender"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            name="dob"
            type="date"
            required
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="border rounded-md">
            <label className=" m-1 font-medium text-gray-700">
              Student Photo <span className="text-sm text-gray-500">(Only JPG or PNG)</span>
            </label>
            <input
              type="file"
              name="documents"
              accept=".jpg,.png"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      {/* Guardian Details */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-3">Guardian Details</h3>
        <div className="flex gap-4 mb-4">
          {["Father", "Mother", "Other"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="guardianType"
                value={type}
                onChange={handleChange}
              />{" "}
              {type}
            </label>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="guardianName"
            required
            placeholder="Guardian Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="guardianRelation"
            required
            placeholder="Guardian Relation"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="guardianEmail"
            placeholder="Guardian Email"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="guardianPhone"
            placeholder="Guardian Phone"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="guardianOccupation"
            placeholder="Guardian Occupation"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="border rounded-md">
            <label className=" m-1 font-medium text-gray-700">
              Guardian Photo <span className="text-sm text-gray-500">(Only JPG or PNG)</span>
            </label>
            <input
              type="file"
              name="documents"
              accept=".jpg,.png"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <textarea
          name="guardianAddress"
          placeholder="Guardian Address"
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
          rows={3}
        ></textarea>
      </div>

      {/* Upload Documents */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-3">Upload Documents</h3>
        <p>
          Documents (To Upload Multiple Document Compress It In A Single File
          Then Upload It)
        </p>
        <input
          type="file"
          name="documents"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-pink-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AdmissionForm;
