import { db, auth } from "../firebase";
import { getDocs, query, where, addDoc, collection } from "firebase/firestore";

import toast from "react-hot-toast";
export const createStudent = async (studentData) => {
  try {
    if (!auth.currentUser) {
      console.error("User not authenticated");
      toast.error("You must be logged in to add a student.");
      return;
    }

    await addDoc(collection(db, "students"), {
      Name: studentData.name,
      Course: studentData.course,
      Mobile_Number: studentData.mobileNumber,
      Class: studentData.class,
      createdBy: localStorage.getItem("email"),
      createdAt: new Date().toISOString(),
    });

    toast.success("Student created successfully!");
  } catch (error) {
    console.error("Error creating student:", error);
    toast.error("Error creating student: " + error.message);
  }
};

export const getAllStudents = async () => {
  try {
    const studentsRef = collection(db, "students");

    const q = query(
      studentsRef,
      where("createdBy", "==", localStorage.getItem("email"))
    );

    const snapshot = await getDocs(q);
    const studentsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return studentsList;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
