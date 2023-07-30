import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const IndustryDoughnut = ({ data }) => {
  const labels = [...new Set(data.map((person) => person.industry))].filter(
    (x) => x && x !== "n/a"
  );

  const datasets = labels.map((label) => {
    return data.filter((person) => person.industry === label).length;
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Number of people in each industry",
      },
    },
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "People",
        data: datasets,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut options={options} data={chartData} />;
};

export default IndustryDoughnut;
