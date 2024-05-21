"use client";
import Sidebar from "../components/home/sidebar/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 bg-gray-700 ">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-200">
          {children}
        </div>
      </div>
    </>
  );
}
