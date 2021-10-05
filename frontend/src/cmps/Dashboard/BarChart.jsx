import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

export function BarChart({ board }) {
    const { members } = board
    const taskPerMember = {}
    members.forEach(member => {
        taskPerMember[member.fullname] = 0
    })

    for (let i = 0; i < members.length; i++) {
        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (!task.members || !task.members.length) return
                task.members.forEach(currMember => {
                    if (currMember.fullname === members[i].fullname) taskPerMember[currMember.fullname]++
                })
            })
        })
    }

    const data = {
        labels: Object.keys(taskPerMember),
        datasets: [
            {
                label: 'Tasks for member',
                data: Object.values(taskPerMember),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,

            },
        ],
    };

    const options = {
        scales: {
            x: {
              ticks: {
                color: "white",
                font: {
                  family: "Segoe UI",
                  size: 15,
                },
              },
            },
            y: {
              ticks: {
                color: "white",
                font: {
                  family: "Segoe UI",
                  size: 15,
                },
              },
            },
          },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Tasks by labels:",
                color: 'rgba(255, 255, 255, 0.897)',
                font: {
                    size: '30'
                }
            },
            datalabels: {
                anchor: "end",
                align: "end",
                offset: -2,
                color: "#000000",
                font: { size: 12 }
            },
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 0.897)',
                    font: {
                        size: 12,
                        family: 'Segoe UI'
                    }
                }
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <Bar data={data} options={options} width={250} height={450} />
    )
       
}