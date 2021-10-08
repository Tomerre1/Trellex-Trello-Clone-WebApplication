import React from "react";
import { Bar } from "react-chartjs-2";

export const ActivityChart = ({ membersActivity }) => {
  const data = {
    labels: [...Object.keys(membersActivity)],
    datasets: [
      {
        label: "Amount",
        data: [...Object.values(membersActivity)],
        backgroundColor: ["#c277e0", "#61bd4f", "#ff9e1a", "#334563"],
        borderColor: ["#c277e0", "darkgreen", "#ff9e1a", "#334563"],
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Member activity",
        color: "rgba(255, 255, 255, 0.897)",
        font: {
          size: "30",
          family: "Segoe UI",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.897)",
          font: {
            family: "Segoe UI",
            size: 15,
          },
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.897)",
          font: {
            family: "Segoe UI",
            size: 15,
          },
        },
      },
    },
    grid: {
      color: "rgba(255, 255, 255, 0.897)",
    },
  };

  return (
    <div className="chart-activity">
      <Bar data={data} options={options1}   height={280}/>
    </div>
  );
};
