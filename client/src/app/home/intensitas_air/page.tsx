// app/layout.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "../profile/page";
import ModalAddIntensitasAir from "@/app/components/home/modal/ModalAddIntensitasAir";
import ModalUpdateIntensitasAir from "@/app/components/home/modal/ModalUpdateIntensitasAir";

export interface IntensitasAirModel {
  id: number;
  product_finish_good: number | null;
  air_permukaan: number | null;
  air_tanah: number | null;
  air_pam: number | null;
  date: string | null; // Assuming date is stored as a string in ISO 8601 format
  date_create?: Date | null; // Optional date with type Date or null
  date_update?: Date | null; // Optional date with type Date or null
}

const HomePage = () => {
  const router = useRouter();
  const accidentRepos = new AccidentRepository();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<IntensitasAirModel | null>(
    null
  );

  const openModal = (data: IntensitasAirModel) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setIsOpen(false);
  };

  const [user, setUser] = useState<User>();
  const [intensitasAirList, setIntensitasAirList] = useState<
    IntensitasAirModel[]
  >([]);
  useEffect(() => {
    // Mendapatkan data login dari local storage
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Melakukan sesuatu berdasarkan status login
    if (isLoggedIn !== "true") {
      router.push("/auth/login");
    }
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

  const getUserList = async (token: string) => {
    try {
      const response = await accidentRepos.getListIntensitasAirAll(token);
      setIntensitasAirList(response.data || []);
      console.error("Error fetching user list:", response);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const deleteIntensitasAir = async (token: string, id: string) => {
    try {
      const response = await accidentRepos.deleteIntensitasAir(token, id);
      getUserList(token);
      console.error("Error fetching user list:", response);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    // Mendapatkan data login dari local storage
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Melakukan sesuatu berdasarkan status login
    if (user && user.token) {
      getUserList(user.token);
    }
  }, [user]);

  return (
    <>
      <div className="flex">
        {" "}
        <h1 className="flex-1 text-gray-200 font-bold text-2xl mb-2">
          Intensitas Air
        </h1>
        {user && user.token && (
          <ModalAddIntensitasAir
            token={user.token}
            onSubmitCallback={() => {
              getUserList(user.token);
            }}
          />
        )}
        {user && user.token && selectedData && (
          <ModalUpdateIntensitasAir
            isOpen={isOpen}
            data={selectedData}
            token={user.token}
            onSubmitCallback={() => {
              getUserList(user.token);
              closeModal();
            }}
          />
        )}
      </div>
      <div className="relative overflow-x-auto ">
        <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-800 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-200 dark:text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg normal-case">
                NO
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Product Finish Good
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Air Permukaan (m3)
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Air Tanah (m3)
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Air PAM / Pihak ke-3 (m3)
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Date
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
            {intensitasAirList.map((item, index) => (
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
                  {item.product_finish_good || 0}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.air_permukaan || 0}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.air_tanah || 0}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.air_pam || 0}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.date?.split("T")[0] || 0}
                </td>
                <td className="px-6 py-4font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                  <button
                    className="btn btn-circle btn-error mr-2"
                    type="button"
                    onClick={() => {
                      if (user && user.token) {
                        deleteIntensitasAir(user.token, item.id.toString());
                      }
                    }}
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      openModal(item);
                    }}
                    className="btn btn-circle btn-warning"
                  >
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
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
              <td className="px-6 py-3 text-gray-700"></td>
              <td className="px-6 py-3 text-gray-700 rounded-e-lg text-center">
                Count : {intensitasAirList.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default HomePage;
