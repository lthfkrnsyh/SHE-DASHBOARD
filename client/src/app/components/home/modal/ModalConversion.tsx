import React, { useState, useEffect } from "react";
import { AccidentRepository } from "../../../../repository/accident/accidentRepository";

interface ConversionTableProps {
  year: string;
  data: Array<{ 
    id: number;
    SumberEnergi: string | null; 
    FaktorKonversiEmisiCO2: string | null; 
    FaktorKonversiEmisiCH4: string | null; 
    FaktorKonversiEmisiN2O: string | null; 
    FaktorKonversiEnergiGJ: string | null; 
  }>;
}

const ConversionTable: React.FC<ConversionTableProps> = ({ year, data }) => {
  const [tableData, setTableData] = useState(data);

  const handleInputChange = (id: number, SumberEnergi: string, FaktorKonversiEmisiCO2: string, FaktorKonversiEmisiCH4: string, FaktorKonversiEmisiN2O: string, FaktorKonversiEnergiGJ: string) => {
    const newData = tableData.map(item =>
      item.id === id ? { ...item, SumberEnergi, FaktorKonversiEmisiCO2, FaktorKonversiEmisiCH4, FaktorKonversiEmisiN2O, FaktorKonversiEnergiGJ } : item
    );
    setTableData(newData);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Sumber Energi
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Faktor Konversi Emisi CO2
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Faktor Konversi Emisi CH4
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Faktor Konversi Emisi N2O
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Faktor Konversi Energi GJ
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tableData.map(item => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.SumberEnergi}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.FaktorKonversiEmisiCO2}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.FaktorKonversiEmisiCH4}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.FaktorKonversiEmisiN2O}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.FaktorKonversiEnergiGJ}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface ModalConversionProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalConversion: React.FC<ModalConversionProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('2019');
  const [conversionData2019, setConversionData2019] = useState([]);
  const [conversionData2024, setConversionData2024] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "your-auth-token"; // Replace with your actual token
        const repo = new AccidentRepository();

        const [data2019, data2024] = await Promise.all([
          repo.getListTabelKonversi2019All(token),
          repo.getListTabelKonversi2024All(token),
        ]);

        console.log("Data 2019:", data2019);
        console.log("Data 2024:", data2024);

        const formattedData2019 = data2019.map((item: any) => ({
          id: item.id,
          SumberEnergi: item.SumberEnergi,
          FaktorKonversiEmisiCO2: item.FaktorKonversiEmisiCO2,
          FaktorKonversiEmisiCH4: item.FaktorKonversiEmisiCH4,
          FaktorKonversiEmisiN2O: item.FaktorKonversiEmisiN2O,
          FaktorKonversiEnergiGJ: item.FaktorKonversiEnergiGJ,
        }));

        const formattedData2024 = data2024.map((item: any) => ({
          id: item.id,
          SumberEnergi: item.SumberEnergi,
          FaktorKonversiEmisiCO2: item.FaktorKonversiEmisiCO2,
          FaktorKonversiEmisiCH4: item.FaktorKonversiEmisiCH4,
          FaktorKonversiEmisiN2O: item.FaktorKonversiEmisiN2O,
          FaktorKonversiEnergiGJ: item.FaktorKonversiEnergiGJ,
        }));

        setConversionData2019(formattedData2019);
        setConversionData2024(formattedData2024);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Conversion Table</h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>
        <div className="mb-4">
          <button onClick={() => setActiveTab('2019')} className={`mr-4 ${activeTab === '2019' ? 'font-bold' : ''}`}>2019</button>
          <button onClick={() => setActiveTab('2024')} className={`${activeTab === '2024' ? 'font-bold' : ''}`}>2024</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === '2019' && <ConversionTable year='2019' data={conversionData2019} />}
            {activeTab === '2024' && <ConversionTable year='2024' data={conversionData2024} />}
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default ModalConversion;
