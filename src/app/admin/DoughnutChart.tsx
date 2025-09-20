'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface DoughnutChartProps {
  labels: string[];
  data: number[];
}

export default function DoughnutChart({ labels, data }: DoughnutChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'My Dataset',
        data,
        backgroundColor: ['red', 'green', 'blue'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'ผู้สมัครค่าย',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
