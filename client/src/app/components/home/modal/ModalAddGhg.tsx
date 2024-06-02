"use client";
import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface UserModalProps {
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalAddGhg: React.FC<UserModalProps> = ({
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [year, setYear] = useState("");
  const [Listrik, setListrik] = useState("");
  const [SolarDieselB30, setSolarDieselB30] = useState("");
  const [NaturalGas, setNaturalGas] = useState("");
  const [SolarDieselB35, setSolarDieselB35] = useState("");
  const [BensinPetrol, setBensinPetrol] = useState("");
  const [GRK, setGRK] = useState("");
  const [EnergyGJ, setEnergyGJ] = useState("");
  const [PenggunaanREC, setPenggunaanREC] = useState("");
  const [TotalAkhirGRK, setTotalAkhirGRK] = useState("");
  const [PersentaseReduceGRK, setPersentaseReduceGRK] = useState("");
  const [TotalAkhirEnergyGJ, setTotalAkhirEnergyGJ] = useState("");
  const [TotalRenewableEnergyGJ, setTotalRenewableEnergyGJ] = useState("");
  const [PersentaseRenewableEnergy, setPersentaseRenewableEnergy] = useState("");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event) => {
    event.preventDefault();
    try {
      const response = await accidentRepos.insertIntensitasAir(token, {
        year: year,
        Listrik: Listrik,
        SolarDieselB30: SolarDieselB30,
        NaturalGas: NaturalGas,
        SolarDieselB35: SolarDieselB35,
        BensinPetrol: BensinPetrol,
        GRK: GRK,
        EnergyGJ: EnergyGJ,
        PenggunaanREC: PenggunaanREC,
        TotalAkhirGRK: TotalAkhirGRK,
        PersentaseReduceGRK: PersentaseReduceGRK,
        TotalAkhirEnergyGJ: TotalAkhirEnergyGJ,
        TotalRenewableEnergyGJ: TotalRenewableEnergyGJ,
        PersentaseRenewableEnergy: PersentaseRenewableEnergy,
      });
      handleCallBack();
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error submitting report:", error);
    }
  };

  const handleCallBack = async () => {
    onSubmitCallback();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <dialog id="my_modal_4" className="modal" open={isOpen}>
        <div className="modal-box w-11/12 max-w-5xl rounded-lg">
          <h3 className="font-bold text-lg w-full ">Add Report</h3>
          <form method="post" onSubmit={handleSubmitInsert}>
            <div className="m-2">
              <input
                type="number"
                id="year"
                placeholder="Tahun"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="Listrik"
                placeholder="Air Permukaan"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={Listrik}
                onChange={(e) => setListrik(e.target.value)}
                min={0}
                required
              />

              <input
                type="numbe"
                id="SolarDieselB30"
                placeholder="Air Tanah"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={SolarDieselB30}
                onChange={(e) => setSolarDieselB30(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="NaturalGas"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={NaturalGas}
                onChange={(e) => setNaturalGas(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="SolarDieselB35"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={SolarDieselB35}
                onChange={(e) => setSolarDieselB35(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="BensinPetrol"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={BensinPetrol}
                onChange={(e) => setBensinPetrol(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="GRK"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={GRK}
                onChange={(e) => setGRK(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="EnergyGJ"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={EnergyGJ}
                onChange={(e) => setEnergyGJ(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="PenggunaanREC"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={PenggunaanREC}
                onChange={(e) => setPenggunaanREC(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="TotalAkhirGRK"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={TotalAkhirGRK}
                onChange={(e) => setTotalAkhirGRK(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="PersentaseReduceGRK"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={PersentaseReduceGRK}
                onChange={(e) => setPersentaseReduceGRK(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="TotalAkhirEnergyGJ"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={TotalAkhirEnergyGJ}
                onChange={(e) => setTotalAkhirEnergyGJ(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="TotalRenewableEnergyGJ"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={TotalRenewableEnergyGJ}
                onChange={(e) => setTotalRenewableEnergyGJ(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="PersentaseRenewableEnergy"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={PersentaseRenewableEnergy}
                onChange={(e) => setPersentaseRenewableEnergy(e.target.value)}
                min={0}
                required
              />
            </div>
            <div className="modal-action">
              {/* if there is a button, it will close the modal */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn rounded-lg btn-error btn-outline w-1/6"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success btn-outline rounded-lg w-1/5"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalAddGhg;
