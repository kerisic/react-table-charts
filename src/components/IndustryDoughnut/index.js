import React from "react";
import { useRef, useState } from "react";
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
import { Doughnut, Bar, getElementAtEvent } from "react-chartjs-2";

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
  const chartRef = useRef();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [barData, setBarData] = useState({});
  const [barOptions, setBarOptions] = useState({});

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
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0]
        ? "pointer"
        : "default";
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

  const createBarData = (dataByIndustry, industry) => {
    let barData = {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
        },
      ],
    };

    barData.labels = dataByIndustry.map(
      (x) => `${x.first_name} ${x.last_name}`
    );
    barData.datasets[0].label = `Salaries in the ${industry} industry`;
    barData.datasets[0].data = dataByIndustry.map((x) => x.salary);
    return barData;
  };

  const createBarOptions = (dataByIndustry, industry) => {
    return {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Salaries in the ${industry} industry`,
        },
        tooltip: {
          displayColors: false,
          callbacks: {
            title: function (context) {
              const person = dataByIndustry[context[0].dataIndex];
              return `Salary: £${parseFloat(person.salary).toFixed(2)}`;
            },
            label: function (context) {
              const person = dataByIndustry[context.dataIndex];
              let label = [];
              label.push(`Years of experience: ${person.years_of_experience}`);
              label.push(`Age: ${person.age} years old`);
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Salary (£)",
          },
        },
      },
    };
  };

  const onDoughnutClick = (event) => {
    const index = getElementAtEvent(chartRef.current, event)[0]?.index;
    if (index) {
      const industry = labels[index];
      const dataByIndustry = data
        .filter((x) => x.industry === industry)
        .sort((a, b) =>
          a.salary === b.salary ? 0 : a.salary > b.salary ? 1 : -1
        );

      const barData = createBarData(dataByIndustry, industry);

      const barOptions = createBarOptions(dataByIndustry, industry);

      setBarOptions(barOptions);
      setBarData(barData);
      setShowBreakdown(true);
    }
  };

  const goBack = () => {
    setShowBreakdown(false);
  };

  return (
    <>
      {!showBreakdown && (
        <Doughnut
          ref={chartRef}
          options={options}
          data={chartData}
          onClick={onDoughnutClick}
        />
      )}
      {showBreakdown && (
        <>
          <button onClick={goBack}>Go back to industry chart</button>
          <Bar options={barOptions} data={barData} />
        </>
      )}
    </>
  );
};

export default IndustryDoughnut;
