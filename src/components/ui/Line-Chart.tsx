import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  labels_title: string;
  data: number[];
  className?: string;
}

export default function LineChart({
  labels,
  labels_title,
  data,
  className = "",
}: LineChartProps) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: labels_title,
        data: data,
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      <Line data={chartData} options={options} />
    </div>
  );
}