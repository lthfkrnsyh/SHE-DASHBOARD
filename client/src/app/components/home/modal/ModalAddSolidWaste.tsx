"use client";
import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface UserModalProps {
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalAddSolidWaste: React.FC<UserModalProps> = ({
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [limbahPlastikNonB3Disposed, setLimbahPlastikNonB3Disposed] = useState("");
  const [limbahDomestikNonPlastikNonB3Disposed, setLimbahDomestikNonPlastikNonB3Disposed] = useState("");
  const [limbahIndustriNonPlastikNonB3Disposed, setLimbahIndustriNonPlastikNonB3Disposed] = useState("");
  const [limbahB3Disposed, setLimbahB3Disposed] = useState("");
  const [totalLimbahPadatDisposed, setTotalLimbahPadatDisposed] = useState("");
  const [limbahPlastikNonB3Diverted, setLimbahPlastikNonB3Diverted] = useState("");
  const [limbahDomestikNonPlastikNonB3Diverted, setLimbahDomestikNonPlastikNonB3Diverted] = useState("");
  const [limbahIndustriNonPlastikNonB3Diverted, setLimbahIndustriNonPlastikNonB3Diverted] = useState("");
  const [limbahB3Diverted, setLimbahB3Diverted] = useState("");
  const [totalLimbahPadatDiverted, setTotalLimbahPadatDiverted] = useState("");
  const [totalLimbahPadat, setTotalLimbahPadat] = useState("");
  const [percentageDiverted, setPercentageDiverted] = useState("");
  const [date, setDate] = useState("");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event) => {
    event.preventDefault();
    try {
      const response = await accidentRepos.insertIntensitasAir(token, {
        limbah_plastik_non_b3_disposed: limbahPlastikNonB3Disposed,
        limbah_domestik_non_plastik_non_b3_disposed: limbahDomestikNonPlastikNonB3Disposed,
        limbah_industri_non_plastik_non_b3_disposed: limbahIndustriNonPlastikNonB3Disposed,
        limbah_b3_disposed: limbahB3Disposed,
        total_limbah_padat_disposed: totalLimbahPadatDisposed,
        limbah_plastik_non_b3_diverted: limbahPlastikNonB3Diverted,
        limbah_domestik_non_plastik_non_b3_diverted: limbahDomestikNonPlastikNonB3Diverted,
        limbah_industri_non_plastik_non_b3_diverted: limbahIndustriNonPlastikNonB3Diverted,
        limbah_b3_diverted: limbahB3Diverted,
        total_limbah_padat_diverted: totalLimbahPadatDiverted,
        total_limbah_padat: totalLimbahPadat,
        percentage_diverted: percentageDiverted,
        date: date,
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
  const handleDateChange = (event) => {
    setDate(event.target.value);
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
                id="limbahPlastikNonB3Disposed"
                placeholder="Limbah Plastik Non B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahPlastikNonB3Disposed}
                onChange={(e) => setLimbahPlastikNonB3Disposed(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="limbahDomestikNonPlastikNonB3Disposed"
                placeholder="Limbah Domestik Non Plastik Non B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahDomestikNonPlastikNonB3Disposed}
                onChange={(e) => setLimbahDomestikNonPlastikNonB3Disposed(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="limbahIndustriNonPlastikNonB3Disposed"
                placeholder="Limbah Industri Non Plastik Non B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahIndustriNonPlastikNonB3Disposed}
                onChange={(e) => setLimbahIndustriNonPlastikNonB3Disposed(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="limbahB3Disposed"
                placeholder="Limbah B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahB3Disposed}
                onChange={(e) => setLimbahB3Disposed(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="totalLimbahPadatDisposed"
                placeholder="Total Limbah Padat Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={totalLimbahPadatDisposed}
                onChange={(e) => setTotalLimbahPadatDisposed(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="limbahPlastikNonB3Diverted"
                placeholder="Limbah Plastik Non B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahPlastikNonB3Diverted}
                onChange={(e) => setLimbahPlastikNonB3Diverted(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="limbahDomestikNonPlastikNonB3Diverted"
                placeholder="Limbah Domestik Non Plastik Non B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahDomestikNonPlastikNonB3Diverted}
                onChange={(e) => setLimbahDomestikNonPlastikNonB3Diverted(e.target.value)}
                min={0}
                required
              />

              <input
                type="number"
                id="limbahIndustriNonPlastikNonB3Diverted"
                placeholder="Limbah Industri Non Plastik Non B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahIndustriNonPlastikNonB3Diverted}
                onChange={(e) => setLimbahIndustriNonPlastikNonB3Diverted(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="limbahB3Diverted"
                placeholder="Limbah B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahB3Diverted}
                onChange={(e) => setLimbahB3Diverted(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="totalLimbahPadatDiverted"
                placeholder="Total Limbah Padat Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={totalLimbahPadatDiverted}
                onChange={(e) => setTotalLimbahPadatDiverted(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="totalLimbahPadat"
                placeholder="Total Limbah Padat"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={totalLimbahPadat}
                onChange={(e) => setTotalLimbahPadat(e.target.value)}
                min={0}
                required
              />
              <input
                type="number"
                id="percentageDiverted"
                placeholder="Percentage Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={percentageDiverted}
                onChange={(e) => setPercentageDiverted(e.target.value)}
                min={0}
                required
              />
              {/* <input
                type="text"
                id="address"
                placeholder="Address"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={airPam}
                onChange={(e) => setAirPam(e.target.value)}
                required
              /> */}
              <input
                type="date"
                id="date"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={date}
                onChange={handleDateChange}
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

export default ModalAddSolidWaste;
