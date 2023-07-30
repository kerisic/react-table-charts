import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const labels = [
  "£20,000-40,000",
  "£40,000-60,000",
  "£60,000-80,000",
  "£80,000-100,000",
  "£100,000-120,000",
  "£120,000-140,000",
  ">£140,000",
];

export const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Salary ranges by age groups",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Salary ranges",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of people",
      },
    },
  },
};

const SalaryBarChart = ({ data }) => {
  const calculateAgeForData = (data) => {
    return data.map((person) => {
      const birthday = new Date(
        person.date_of_birth.split("/").reverse().join("-")
      );
      const today = new Date();
      let age = today.getFullYear() - birthday.getFullYear();
      const monthDiff = today.getMonth() - birthday.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthday.getDate())
      ) {
        age--;
      }
      person.age = age;
      return person;
    });
  };

  const setSalaryDataByAge = (group, ageLower, ageHigher) => {
    const salaryBands = [
      { lower: 20000, higher: 40000 },
      { lower: 40000, higher: 60000 },
      { lower: 60000, higher: 80000 },
      { lower: 80000, higher: 100000 },
      { lower: 100000, higher: 120000 },
      { lower: 120000, higher: 140000 },
      { lower: 140000, higher: null },
    ];

    const countByAge = [];

    const filtered = group.filter(
      (x) => x.age < ageHigher && x.age >= ageLower
    );

    salaryBands.forEach((band) => {
      if (!band.higher) {
        countByAge.push(filtered.filter((x) => x.salary >= band.lower).length);
      } else {
        countByAge.push(
          filtered.filter(
            (x) => x.salary < band.higher && x.salary >= band.lower
          ).length
        );
      }
    });

    return countByAge;
  };

  const mapped = calculateAgeForData(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "20-30 years old",
        data: setSalaryDataByAge(mapped, 20, 30),
      },
      {
        label: "30-40 years old",
        data: setSalaryDataByAge(mapped, 30, 40),
      },
      {
        label: "40-50 years old",
        data: setSalaryDataByAge(mapped, 40, 50),
      },
      {
        label: "50-60 years old",
        data: setSalaryDataByAge(mapped, 50, 60),
      },
      {
        label: "60-70 years old",
        data: setSalaryDataByAge(mapped, 60, 70),
      },
    ],
  };

  return (
    <div className="salaryByAgeChart">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default SalaryBarChart;
