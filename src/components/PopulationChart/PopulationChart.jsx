import React, { useEffect, useState } from "react";
import "./index.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PopulationChart = () => {
  const [data, setData] = useState([]);
  const [yearsToShow, setYearsToShow] = useState(10);

  useEffect(() => {
    fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.data.sort((a, b) => a.Year - b.Year);
        setData(sorted);
      });
  }, []);

  const filteredData = data.slice(-yearsToShow);

  const options = {
  plugins: {
    legend: {
      display: false
    }
  }
};

  const chartData = {
    labels: filteredData.map((entry) => entry.Year),
    datasets: [
      {
        label: "Population",
        data: filteredData.map((entry) => entry.Population),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false
      },
    ],
  };

  return (
    <div className="population-chart">
        <span> Die letzten: </span>
        <select value={yearsToShow} onChange={(e) => setYearsToShow(Number(e.target.value))}>
          <option value={3}>3 Jahre</option>
          <option value={5}>5 Jahre</option>
          <option value={10}>10 Jahre</option>
        </select>

      <Line data={chartData} options={options} />

    </div>
  );
};

export default PopulationChart;
