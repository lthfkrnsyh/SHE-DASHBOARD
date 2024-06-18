import React from "react";
import { Bar } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";

export interface BarChartData {
  labels: string[];
  datasets: { data: number[]; label: string; backgroundColor: string; borderColor?: string; borderWidth?: number }[];
}

interface BarChartProps {
  data: BarChartData;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  Chart.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    // Customize other options here (optional)
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
