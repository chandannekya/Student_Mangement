import { useNavigate } from "react-router-dom";

import React from "react";

import AddStudentForm from "./AddStudentForm";
export const AddStudentModel = () => {
  const navigate = useNavigate();

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 bg-black/40 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <AddStudentForm />
        <button
          onClick={() => navigate("/students")}
          className="mt-4 w-full max-w-sm bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
