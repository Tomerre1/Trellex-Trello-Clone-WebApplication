import React from "react";
import { Bar } from "react-chartjs-2";

export const TodoChart = ({ board }) => {
  const getChecklistData = () => {
    let todos = 0;
    let doneTodos = 0;
    let checklists = 0;
    let doneChecklists = 0;
    board?.groups.forEach((group) => {
      if (!group?.tasks.length) {
        return;
      }
      group.tasks.forEach((task) => {
        if (task.checklists) {
          checklists += task.checklists.length;
          task.checklists.forEach((checklist) => {
            let inTodos = checklist.todos.length;
            let inDoneTodos = 0;
            todos += checklist.todos.length;
            checklist.todos.forEach((todo) => {
              if (todo.isDone) {
                doneTodos += 1;
                inDoneTodos += 1;
              }
            });
            console.log(inTodos, inDoneTodos);
            if (inTodos === inDoneTodos) doneChecklists += 1;
          });
        }
      });
    });
    return [todos, doneTodos, checklists, doneChecklists];
  };
  
  const data = {
    labels: [
      "Total Todo's",
      "Completed Todo's",
      "Total Checklists",
      "Completed Checklists",
    ],
    datasets: [
      {
        label: "Amount",
        data: [...getChecklistData()],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "#61bd4f",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "darkgreen",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
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
        position: "right",
      },
      title: {
        display: true,
        text: "Checklist Stats:",
        color:'white',
      },
    },
  };
  return (
    <div className="chart-todo">

      <Bar data={data} options={options} />
    </div>
  );
};
