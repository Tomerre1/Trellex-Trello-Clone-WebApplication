import React from "react";
import { Bar } from "react-chartjs-2";

export const ActivityChart = ({ membersActivity }) => {
 
  const data = {
    labels: [...Object.keys(membersActivity)],
    datasets: [
      {
        label: "Amount",
        data: [...Object.values(membersActivity)],
        backgroundColor: ["#c277e0", "#61bd4f"],
        borderColor: ["#c277e0", "darkgreen"],
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
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
        text: "Members by activity",
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
    <div className="chart-todo">
      {    console.log(Object.keys(membersActivity))
}
      <div className="chart-1">
        <Bar data={data} options={options1} width={350} height={350}/>
\      </div>
    </div>
  );
};
