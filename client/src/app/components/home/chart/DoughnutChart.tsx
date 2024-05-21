// components/DoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart } from "chart.js"; // Register elements

export interface DoughnutChartData {
  labels: string[];
  datasets: { data: number[]; label: string; backgroundColor: string[] }[];
}

const DoughnutChart: React.FC<DoughnutChartData> = ({ data }) => {
  Chart.register(ArcElement, Tooltip, Legend); // Register elements

  const options = {
    responsive: true, // Makes chart responsive to screen size
    // Customize other options here (optional)
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
