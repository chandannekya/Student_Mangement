import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/oprations/student"; // Updated import

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    class: "", // Retained class field
    course: "", // Added course field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStudent(formData); // Updated function call
      // Navigate to a success page or any other route
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Student</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          {/* Mobile Number Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobile"
            >
              Mobile Number
            </label>
            <div className="flex">
              <select className="border border-gray-300 px-2 py-2 rounded-l-md focus:outline-none focus:border-indigo-500">
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
              </select>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="9876543210"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Class Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="class"
            >
              Class
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="class"
              name="class"
              placeholder="10th Grade"
              onChange={handleChange}
            />
          </div>

          {/* Course Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="course"
            >
              Course
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="course"
              name="course"
              placeholder="Mathematics"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
