"use client";
import React, { useEffect } from "react"; // Adjust the import path as needed
import LoginForm from "../../components/auth/login";
import { AuthRepository } from "@/repository/auth/authRepository";

import { useRouter } from "next/navigation";

// Define Page component
const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Mendapatkan data login dari local storage
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Melakukan sesuatu berdasarkan status login
    if (isLoggedIn === "true") {
      router.push("/home");
    }
  }, []);

  const authRepos = new AuthRepository();
  // Define handleLogin function to handle login
  const handleLogin = async (userData: { email: string; password: string }) => {
    console.log("🚀 ~ handleLogin ~ userData:", userData);
    const respon = await authRepos.loginApi(userData.email, userData.password);
    console.log("🚀 ~ handleLogin ~ token:", respon);
    if (respon) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("data", JSON.stringify(respon.data));
      // Use truthy check for token
      router.push("/home"); // Redirect to home page on successful login
    }
  };

  // Render the page with LoginForm component
  return <LoginForm onSubmit={handleLogin} />;
};

// Export the Page component
export default Page;
