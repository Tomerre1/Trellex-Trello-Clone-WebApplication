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
                label: '# of task for each member',
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
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        // indexAxis: "y",
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
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
                color: 'white',
                font: {
                    size: '40'
                }
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <Bar data={data} options={options}   width={250}
        height={450}/>
    )
}