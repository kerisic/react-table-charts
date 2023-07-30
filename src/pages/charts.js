import React from "react";
import { useState, useEffect } from "react";
import SalaryBarChart from "../components/SalaryBarChart";
import IndustryDoughnut from "../components/IndustryDoughnut";

const Charts = () => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    fetch("./mockData.json")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoaded(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loaded) {
    return (
      <>
        <SalaryBarChart data={data} />
        <IndustryDoughnut data={data} />
      </>
    );
  }
};

export default Charts;
