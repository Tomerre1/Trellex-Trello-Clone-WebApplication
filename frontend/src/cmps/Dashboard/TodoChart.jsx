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
          let inChecklists = checklists.length;
          task.checklists.forEach((checklist) => {
            let inDoneChecklists = 0;
            todos += checklist.todos.length;
            checklist.todos.forEach((todo) => {
              if (todo.isDone) doneTodos += 1;
              inDoneChecklists +=1;
            });
            // if(inChecklists)
          });
        }
      });
    });
    console.log("todos", todos, "donetodos", doneTodos, checklists);
    return [todos,doneTodos];
  };
  console.log({...getChecklistData()});
  const data = {
    labels: ["Total Todo's", "Completed Todo's", "Yellow", "Green",],
    datasets: [
      {
        label: "# of Votes",
        data: [...getChecklistData()],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };
  return (
    <div className="chart-todo">
        <h1 className="title">Todo's Status: </h1>
       
      <Bar data={data} options={options} />
    </div>
  );
};
