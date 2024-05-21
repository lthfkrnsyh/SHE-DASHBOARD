import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { IntensitasAirModel } from "@/app/home/intensitas_air/page";

interface UserModalProps {
  isOpen: boolean;
  data: IntensitasAirModel;
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalUpdateIntensitasAir: React.FC<UserModalProps> = ({
  isOpen,
  data,
  token,
  onSubmitCallback,
}) => {
  const [productFinishGood, setProductFinishGood] = useState(
    data.product_finish_good || "0"
  );
  const [airPermukaan, setAirPermukaan] = useState(data.air_permukaan || "0");
  const [airTanah, setAirTanah] = useState(data.air_tanah || "0");
  const [airPam, setAirPam] = useState(data.air_pam || "0");
  const [date, setDate] = useState(data.date || "");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event) => {
    event.preventDefault();
    try {
      await accidentRepos.updateIntensitasAir(token, data.id.toString(), {
        product_finish_good: productFinishGood,
        air_permukaan: airPermukaan,
        air_tanah: airTanah,
        air_pam: airPam,
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
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
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
                  id="productFinishGood"
                  placeholder="Product Finish Good"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={productFinishGood}
                  onChange={(e) => setProductFinishGood(e.target.value)}
                  required
                />

                <input
                  type="number"
                  id="airPermukaan"
                  placeholder="Air Permukaan"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={airPermukaan}
                  onChange={(e) => setAirPermukaan(e.target.value)}
                  required
                />

                <input
                  type="number"
                  id="airTanah"
                  placeholder="Air Tanah"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={airTanah}
                  onChange={(e) => setAirTanah(e.target.value)}
                  required
                />

                <input
                  type="number"
                  id="airPam"
                  placeholder="Air Pam"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={airPam}
                  onChange={(e) => setAirPam(e.target.value)}
                  required
                />
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

export default ModalUpdateIntensitasAir;
