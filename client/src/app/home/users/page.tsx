"use client";
import { useEffect, useState } from "react";
import { User } from "../profile/page";
import { AuthRepository } from "@/repository/auth/authRepository";
import ModalAddUser from "@/app/components/home/modal/ModalAddUser";

export interface RoleModel {
  id: number;
  code: string;
  name: string;
  date_create: string;
  date_update: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  role: RoleModel;
  token: string;
  date_create: string;
  date_update: string | null;
}

export default function ListReportPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const authRepository = new AuthRepository();

  useEffect(() => {
    const data: any = localStorage.getItem("data");
    if (data) {
      const userData = JSON.parse(data);
      const userDataObject: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        address: userData.address,
        role: userData.role,
        token: userData.token,
        date_create: userData.date_create,
        date_update: userData.date_update,
      };
      setUser(userDataObject);
    }
  }, []);

  useEffect(() => {
    if (user && user.token) {
      getUserList(user.token);
    }
  }, [user]);

  const filterDataBySearch = () => {
    if (!searchQuery) return userList;
    return userList.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getUserList = async (token: string) => {
    try {
      const response = await authRepository.getUserList(token);
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const paginatedData = (data: User[]) => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return data.slice(startIndex, startIndex + entriesPerPage);
  };

  const filteredData = filterDataBySearch();
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-white font-bold text-3xl">
            User Menu
          </h1>
          <p className="text-gray-200 mb-5">
            Halaman ini menampilkan list data user.
          </p>
        </div>

        {user && user.token && (
          <ModalAddUser
            token={user.token}
            onSubmitCallback={() => {
              if (user && user.token) {
                getUserList(user.token);
              }
            }}
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Search by Name or Role:
        </label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md"
            placeholder="Search..."
          />
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="p-2 border rounded-md"
          >
            <option value={10}>10 entries per page</option>
            <option value={25}>25 entries per page</option>
            <option value={50}>50 entries per page</option>
            <option value={100}>100 entries per page</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-800 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-200 dark:text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg normal-case">
                NO
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Name
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Address
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-e-lg justify-center normal-case text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="rounded-md bg-gray-800">
            {paginatedData(filteredData).map((item, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 hover:bg-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.address}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.phone_number}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.role.name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                  <button className="btn btn-circle btn-success" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-gray-900 dark:text-white bg-gray-200">
              <th scope="row" className="px-6 py-3 text-gray-700  rounded-s-lg">
                Total
              </th>
              <td className="px-6 py-3 text-gray-700 "></td>
              <td className="px-6 py-3 text-gray-700 "></td>
              <td className="px-6 py-3 text-gray-700"></td>
              <td className="px-6 py-3 text-gray-700"></td>
              <td className="px-6 py-3 text-gray-700 rounded-e-lg text-center">
                Count : {filteredData.length}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 bg-gray-200 rounded-md"
          >
            Previous
          </button>
          <span className="p-2" style={{ color: 'white' }}>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 bg-gray-200 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
