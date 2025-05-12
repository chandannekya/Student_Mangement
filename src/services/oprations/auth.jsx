// src/services/oprations/auth.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust path if needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
export const signIn = async (email, password, navigate, setIsAuthenticated) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user);
    toast.success("Login Successful");
    localStorage.setItem("email", email); // Store email if needed
    localStorage.setItem("token", userCredential.user.accessToken); // Store token if needed
    setIsAuthenticated(true);
    navigate("/");
  } catch (error) {
    console.error("Firebase SignIn Error:", error);
    toast.error("Login Failed: " + error.message);
    // Handle specific error messages if needed
    if (error.code === "auth/user-not-found") {
      toast.error("User not found. Please check your email.");
    } else if (error.code === "auth/wrong-password") {
      toast.error("Incorrect password. Please try again.");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Invalid email address. Please check your email.");
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};

// adjust path as needed

export const signUp = async (email, password, navigate, setIsAuthenticated) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created:", userCredential.user);
    toast.success("Account Created Successfully");
    localStorage.setItem("token", userCredential.user.accessToken);
    localStorage.setItem("email", email); // Store token if needed
    setIsAuthenticated(true);
    navigate("/"); // or wherever you want to redirect
  } catch (error) {
    console.error("SignUp error:", error);

    toast.error("SignUp Failed: " + error.message);
    // Handle specific error messages if needed
    if (error.code === "auth/email-already-in-use") {
      toast.error("Email already in use. Please use a different email.");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Invalid email address. Please check your email.");
    } else if (error.code === "auth/weak-password") {
      toast.error("Password is too weak. Please choose a stronger password.");
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};
