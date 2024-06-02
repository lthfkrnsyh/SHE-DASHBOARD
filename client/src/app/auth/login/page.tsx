"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import LoginForm from "../../components/auth/login";
import { AuthRepository } from "@/repository/auth/authRepository";

// Styled components
const PageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%);
  padding: 1rem;
`;

const BoxContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin: 1rem;
`;

const LoginBox = styled(BoxContainer)`
  padding: 2rem;
  height: 100%; /* Set height to 100% */
  margin-bottom: 1rem;
`;

const TitleBox = styled(BoxContainer)`
  padding: 2rem;
  height: 100%; /* Set height to 100% */
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem; /* Added margin-bottom for spacing */
`;

// Define Page component
const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      router.push("/home");
    }
  }, []);

  const authRepos = new AuthRepository();

  const handleLogin = async (userData: { email: string; password: string }) => {
    console.log("🚀 ~ handleLogin ~ userData:", userData);
    const respon = await authRepos.loginApi(userData.email, userData.password);
    console.log("🚀 ~ handleLogin ~ token:", respon);
    if (respon) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("data", JSON.stringify(respon.data));
      router.push("/home");
    }
  };

  return (
    <PageWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleBox initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      <Image src="https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZGKZPm2OGbHHiLJkcMk6DcrBVRkkKIgentWN5TQrlSv9fxvCHvPbssmOxN0Wkc9I_2hrXdJ7czj_EnbNvF4CQ_2YerU_yJ1fk=w1920-h970-rw-v1" alt="Welcome Image" />
        
      </TitleBox>
      <LoginBox initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <LoginForm onSubmit={handleLogin} />
      </LoginBox>
    </PageWrapper>
  );
};

export default Page;
