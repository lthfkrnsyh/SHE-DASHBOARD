// app/layout.tsx
"use client";
import React, { useEffect, useState } from "react";
import DoughnutChart from "../components/home/chart/DoughnutChart";
import BarChart, { BarChartData } from "../components/home/chart/BarChart";
import { useRouter } from "next/navigation";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "./profile/page";

const HomePage = () => {
  const router = useRouter();
  const accidentRepos = new AccidentRepository();
  
  const [chartData2, setChartData2] = useState<BarChartData>({
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: "Kejadian Terjadi",
        data: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 1050],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [chartData, setChartData] = useState<DoughnutChartData>({
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
        label: "",
        backgroundColor: [
          "red",
          "blue",
          "yellow",
          "blue",
          "gray",
          "green",
          "salmon",
          "pink",
          "cyan",
          "magenta",
          "brown",
          "navy",
        ],
      },
    ],
  });

  const [chartFrequncyRate, setChartFrequncyRate] = useState<DoughnutChartData>({
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
        label: "",
        backgroundColor: [
          "red",
          "blue",
          "yellow",
          "blue",
          "gray",
          "green",
          "salmon",
          "pink",
          "cyan",
          "magenta",
          "brown",
          "navy",
        ],
      },
    ],
  });

  const [intensitasAir, setIntensitasAir] = useState<DoughnutChartData>({
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
        label: "",
        backgroundColor: [
          "red",
          "blue",
          "yellow",
          "blue",
          "gray",
          "green",
          "salmon",
          "pink",
          "cyan",
          "magenta",
          "brown",
          "navy",
        ],
      },
    ],
  });

  const [chartSeverityRate, setChartSeverityRate] = useState<DoughnutChartData>({
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
        label: "",
        backgroundColor: [
          "red",
          "blue",
          "yellow",
          "blue",
          "gray",
          "green",
          "salmon",
          "pink",
          "cyan",
          "magenta",
          "brown",
          "navy",
        ],
      },
    ],
  });

  const [yearInput, setYearInput] = useState("2024");
  const [user, setUser] = useState<User>();

  const [selectedCharts, setSelectedCharts] = useState({
    kejadianTerjadi: true,
    jamKerjaHilang: true,
    frequencyRate: true,
    severityRate: true,
    intensitasAir: true,
  });

  const handleCheckboxChange = (chart: string) => {
    setSelectedCharts((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }));
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
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

  useEffect(() => {
    if (user && user.token) {
      getList(user.token, yearInput);
    }
  }, [user]);

  const getList = async (token: string, year: string) => {
    try {
      const response = await accidentRepos.getChartReport(token, year);
      const responsejamKerjaHilang = await accidentRepos.getChartJamKerjaHilang(token, year);
      const responseFrequncyRate = await accidentRepos.getChartFrequncyRate(token, year);
      const responseSeverityRate = await accidentRepos.getChartSeverityRate(token, year);
      const responseIntensitasAir = await accidentRepos.getChartIntensitasAirRate(token, year);
      
      if (response.status === "SUCCESS") {
        setChartData2({
          labels: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          datasets: [
            {
              label: "Kejadian Terjadi",
              data: response.data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      }

      if (responsejamKerjaHilang.status === "SUCCESS") {
        setChartData({
          labels: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          datasets: [
            {
              data: responsejamKerjaHilang.data,
              label: "",
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "bisque",
                "gray",
                "green",
                "salmon",
                "pink",
                "cyan",
                "magenta",
                "brown",
                "navy",
              ],
            },
          ],
        });
      }

      if (responseFrequncyRate.status === "SUCCESS") {
        setChartFrequncyRate({
          labels: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          datasets: [
            {
              data: responseFrequncyRate.data,
              label: "",
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "bisque",
                "gray",
                "green",
                "salmon",
                "pink",
                "cyan",
                "magenta",
                "brown",
                "navy",
              ],
            },
          ],
        });
      }

      if (responseSeverityRate.status === "SUCCESS") {
        setChartSeverityRate({
          labels: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          datasets: [
            {
              data: responseSeverityRate.data,
              label: "",
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "bisque",
                "gray",
                "green",
                "salmon",
                "pink",
                "cyan",
                "magenta",
                "brown",
                "navy",
              ],
            },
          ],
        });
      }

      if (responseIntensitasAir.status === "SUCCESS") {
        setIntensitasAir({
          labels: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          datasets: [
            {
              data: responseIntensitasAir.data.data_total,
              label: "",
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "bisque",
                "gray",
                "green",
                "salmon",
                "pink",
                "cyan",
                "magenta",
                "brown",
                "navy",
              ],
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="flex mb-3">
        <h1 className="text-gray-200 font-bold text-2xl mb-2 flex-1">Main page</h1>
        <input
          className="input input-bordered rounded-lg"
          type="number"
          placeholder="YYYY"
          min="2000"
          max="2050"
          value={yearInput}
          onChange={(e) => {
            setYearInput(e.target.value);
            if (user && user.token) {
              getList(user.token, e.target.value);
            }
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 card bg-white p-3">
        <div className="flex flex-wrap">
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.kejadianTerjadi}
              onChange={() => handleCheckboxChange("kejadianTerjadi")}
              className="mr-2"
            />
            Kecelakaan Kerja
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.jamKerjaHilang}
              onChange={() => handleCheckboxChange("jamKerjaHilang")}
              className="mr-2"
            />
            Jam Kerja Hilang
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.frequencyRate}
              onChange={() => handleCheckboxChange("frequencyRate")}
              className="mr-2"
            />
            Frequency Rate
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.severityRate}
              onChange={() => handleCheckboxChange("severityRate")}
              className="mr-2"
            />
            Severity Rate
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.intensitasAir}
              onChange={() => handleCheckboxChange("intensitasAir")}
              className="mr-2"
            />
            Intensitas Air
          </label>
        </div>
      </div>

      <div className={`grid ${Object.values(selectedCharts).filter(Boolean).length > 1 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4`}>
        {selectedCharts.kejadianTerjadi && (
          <div className="card bg-white p-3">
            <div>
              <h1 className="text-gray-700 font-bold text-2xl">Kecelakaan Kerja</h1>
              <BarChart data={chartData2} />
            </div>
          </div>
        )}

        {selectedCharts.jamKerjaHilang && (
          <div className="card bg-white p-3">
            <div>
              <h1 className="text-gray-700 font-bold text-2xl">Jam Kerja Hilang</h1>
              <DoughnutChart data={chartData} />
            </div>
          </div>
        )}

        {selectedCharts.frequencyRate && (
          <div className="card bg-white p-3">
            <div>
              <h1 className="text-gray-700 font-bold text-2xl">Frequency Rate</h1>
              <DoughnutChart data={chartFrequncyRate} />
            </div>
          </div>
        )}

        {selectedCharts.severityRate && (
          <div className="card bg-white p-3">
            <div>
              <h1 className="text-gray-700 font-bold text-2xl">Severity Rate</h1>
              <DoughnutChart data={chartSeverityRate} />
            </div>
          </div>
        )}

        {selectedCharts.intensitasAir && (
          <div className="card bg-white p-3">
            <div>
              <h1 className="text-gray-700 font-bold text-2xl">Intensitas Air</h1>
              <DoughnutChart data={intensitasAir} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;