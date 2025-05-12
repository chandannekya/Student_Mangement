import React, { useEffect, useState } from "react";
// Firestore methods
import { getAllStudents } from "../services/oprations/student"; // Import the function to fetch students

export const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filterCourse, setFilterCourse] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsList = await getAllStudents();
        setStudents(studentsList);

        // Extract unique courses from students data
        const allCourses = studentsList.flatMap((student) => student.Course); // Assuming `Course` is the field name
        const uniqueCourses = [...new Set(allCourses)]; // Remove duplicates
        setCourses(uniqueCourses); // Set the courses for the filter dropdown
        console.log(studentsList);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on the selected course
  const filteredStudents = filterCourse
    ? students.filter((student) => student.Course === filterCourse)
    : students; // Show all if no filter

  return (
    <div className="">
      {/* Filter Section */}
      <div className="filter-section rounded-md  static left-0 right-0 bg-white p-4 shadow-sm mb-4">
        <label htmlFor="course-filter" className="block text-gray-700">
          Filter by Course:
        </label>
        <select
          id="course-filter"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Courses</option>
          {/* Dynamically create the options based on the available courses */}
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto ">
        <div className="max-h-[400px] overflow-y-auto h-60">
          {" "}
          {/* Fixed height with scroll */}
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-900">Name</th>
                <th className="px-4 py-2 font-medium text-gray-900">Course</th>
                <th className="px-4 py-2 font-medium text-gray-900">Class</th>
                <th className="px-4 py-2 font-medium text-gray-900">
                  Mobile No.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id || index}>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {student.Name || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {student.Course || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {student.Class || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {student.Mobile_Number || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
