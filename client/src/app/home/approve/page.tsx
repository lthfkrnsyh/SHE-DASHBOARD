"use client";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { useEffect, useState } from "react";
import { User } from "../profile/page";
import { useRouter, usePathname } from "next/navigation";
import ModalAdd from "@/app/components/home/modal/Modal";

interface AccidentReport {
  id: number;
  user_id: number;
  date_accident: Date;
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
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const accidentRepos = new AccidentRepository();

const [reportHistoryList, setReportHistoryList] = useState<ReportHistoryModel[]>([]);
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

  const approvedReport = async (id: string) => {
    try {
      if (user && user.token) {
        const response = await accidentRepos.approvedReport(
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

  const handleApproveClick = (id: string) => {
    setSelectedReportId(id);
    setOpen(true);
  };

  const handleConfirmApprove = () => {
    if (selectedReportId) {
      approvedReport(selectedReportId);
    }
    setOpen(false);
    setSelectedReportId(null);
  };

  const handleCancelApprove = () => {
    setOpen(false);
    setSelectedReportId(null);
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

  const filterDataByDate = () => {
    if (!startDate || !endDate) return reportHistoryList;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return setReportHistoryList.filter(item => {
      const itemDate = new Date(item.data_input || '');
      return itemDate >= start && itemDate <= end;
    });
  };

  const paginatedData = (data: getList[]) => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = filterDataByDate();
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);


  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-white font-bold text-3xl">
            Approve Incident Report for Section Head
          </h1>
          <p className="text-gray-200 mb-5">
            This is the content specific to the home page.
          </p>
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
                Informasi
              </th>
              <th scope="col" className="px-6 py-3 normal-case">
                Date Accident
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-e-lg justify-center normal-case text-center"
              >
                Approve
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
                      onClick={() => handleApproveClick(item.id.toString())}
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

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p>Are you sure you want to approve this report?</p>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-secondary mr-2"
                onClick={handleCancelApprove}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmApprove}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
