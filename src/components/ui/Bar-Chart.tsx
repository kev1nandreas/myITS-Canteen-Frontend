import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  labels_title: string;
  data: number[];
  classname?: string;
}

export default function BarChart({
  labels,
  labels_title,
  data,
  classname = "",
}: BarChartProps) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: labels_title,
        data: data,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
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
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${classname}`}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
}
