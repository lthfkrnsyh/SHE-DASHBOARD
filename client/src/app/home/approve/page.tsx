"use client";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { useEffect, useState } from "react";
import { User } from "../profile/page";
import { useRouter, usePathname } from "next/navigation";
import ModalAdd from "@/app/components/home/modal/Modal";

interface AccidentReport {
  id: number;
  user_id: number;
  date_accident: string;
  time_accident: string;
  location: string;
  department: string;
  informasi: string;
  kronologi: string;
  image_accident: string;
  first_aid: string;
  image_first_aid: string;
  event_category: string;
  approved: string;
  approved_date: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    role: string;
    date_create: string;
    date_update: string | null;
  };
  approved_by: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    role: string;
    date_create: string;
    date_update: string | null;
  };
}

export default function ApprovePage() {
  const [user, setUser] = useState<User>();
  const [dataList, setDataList] = useState<AccidentReport[]>([]);
  const [open, setOpen] = useState(false);

  const accidentRepos = new AccidentRepository();

  const pathname = usePathname();
  const router = useRouter();

  // Fungsi untuk mengambil data
  const getList = async (token: string) => {
    try {
      const response = await accidentRepos.getListAllApi(token);
      if (response.status === "SUCCESS") {
        setDataList(response.data);
        console.log("🚀 ~ getList ~ response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const approvedRepot = async (id: string) => {
    try {
      if (user && user.token) {
        const response = await accidentRepos.approvedRepot(
          user.token,
          id,
          user.id.toString()
        );
        if (response.status === "SUCCESS") {
          getList(user.token);
          console.log("🚀 ~ getList ~ response:", response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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

  // Memanggil getList ketika user diubah
  useEffect(() => {
    if (user && user.token) {
      getList(user.token);
    }

    if (user && user.token && user.role != "1") {
      router.push("/home");
    }
  }, [user]);

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-white font-bold text-3xl">
            Welcome to the Home Page!
          </h1>
          <p className="text-gray-200 mb-5">
            This is the content specific to the home page.
          </p>
        </div>
        {/* 
        {user && user.token && (
          <ModalAdd
            token={user.token}
            onSubmitCallback={() => getList(user.token)}
          />
        )} */}
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
                Informasi
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Date Accident
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
            {dataList.map((item, index) => (
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
                  {item.user.name}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.user.address}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.informasi}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.date_accident}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                  {item.approved != "1" ? (
                    <button
                      className="btn btn-circle btn-warning"
                      type="button"
                      onClick={() => approvedRepot(item.id.toString())}
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
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="btn btn-circle btn-success"
                      type="button"
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
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  )}

                  <button className="btn btn-circle btn-error ml-2 ">
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
                Count : {dataList.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
