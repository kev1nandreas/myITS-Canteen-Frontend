import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface DoughnutChartProps {
  labels: string[];
  labels_title: string;
  data: number[];
  classname?: string;
}

export default function DoughnutChart({
  labels,
  labels_title,
  data,
  classname = "",
}: DoughnutChartProps) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: labels_title,
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: false,
        text: labels_title,
      },
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 w-full ${classname}`}
    >
      <Doughnut data={chartData} options={options} />
    </div>
  );
}