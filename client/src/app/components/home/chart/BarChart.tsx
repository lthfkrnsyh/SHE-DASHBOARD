// components/DoughnutChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend } from "chart.js"; // Register elements
import Chart from "chart.js/auto";
export interface BarChartData {
  labels: string[];
  datasets: { data: number[]; label: string; backgroundColor: string }[];
}

const BarChart: React.FC<BarChartData> = ({ data }) => {
  Chart.register(ArcElement, Tooltip, Legend); // Register elements

  const options = {
    responsive: true, // Makes chart responsive to screen size
    // Customize other options here (optional)
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
