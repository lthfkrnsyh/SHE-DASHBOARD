import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { GhgModel } from "@/app/home/ghg/page";

interface UserModalProps {
  isOpen: boolean;
  data: GhgModel;
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalUpdateGhg: React.FC<UserModalProps> = ({
  isOpen,
  data,
  token,
  onSubmitCallback,
}) => {
  const [year, setYear] = useState(
    data.year || "0"
  );
  const [Listrik, setListrik] = useState(data.Listrik || "0");
  const [SolarDieselB30, setSolarDieselB30] = useState(data.SolarDieselB30 || "0");
  const [NaturalGas, setNaturalGas] = useState(data.NaturalGas || "0");
  const [SolarDieselB35, setSolarDieselB35] = useState(data.SolarDieselB35 || "");
  const [BensinPetrol, setBensinPetrol] = useState(data.SolarDieselB35 || "");
  const [GRK, setGRK] = useState(data.SolarDieselB35 || "");
  const [EnergyGJ, setEnergyGJ] = useState(data.SolarDieselB35 || "");
  const [PenggunaanREC, setPenggunaanREC] = useState(data.SolarDieselB35 || "");
  const [TotalAkhirGRK, setTotalAkhirGRK] = useState(data.SolarDieselB35 || "");
  const [PersentaseReduceGRK, setPersentaseReduceGRK] = useState(data.SolarDieselB35 || "");
  const [TotalAkhirEnergyGJ, setTotalAkhirEnergyGJ] = useState(data.SolarDieselB35 || "");
  const [TotalRenewableEnergyGJ, setTotalRenewableEnergyGJ] = useState(data.SolarDieselB35 || "");
  const [PersentaseRenewableEnergy, setPersentaseRenewableEnergy] = useState(data.SolarDieselB35 || "");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event) => {
    event.preventDefault();
    try {
      await accidentRepos.updateIntensitasAir(token, data.id.toString(), {
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
  };

  return (
    <>
      {isOpen && (
        <div className="modal" open={isOpen}>
          <div className="modal-box w-11/12 max-w-5xl rounded-lg">
            <h3 className="font-bold text-lg w-full">Add Report</h3>
            <form method="post" onSubmit={handleSubmitInsert}>
              <div className="m-2">
              <input
                type="number"
                id="year"
                placeholder="Tahun"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min={2019}
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
                type="number"
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
                  onClick={() => handleCallBack()}
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
        </div>
      )}
    </>
  );
};

export default ModalUpdateGhg;
