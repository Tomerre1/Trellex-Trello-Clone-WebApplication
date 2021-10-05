import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export function DoughnutChart({ board }) {

    const calcTasksByLabel = () => {
        const labelIds = board.labels.map(label => label.id);
        const labelCounts = [];

        for (let i = 0; i < labelIds.length; i++) {
            labelCounts.push(0);
        }

        for (let i = 0; i < board.groups.length; i++) {
            for (let j = 0; j < board.groups[i].tasks.length; j++) {
                for (let k = 0; k < board.groups[i].tasks[j].labelIds.length; k++) {
                    if (labelIds.includes(board.groups[i].tasks[j].labelIds[k])) {
                        labelCounts[labelIds.indexOf(board.groups[i].tasks[j].labelIds[k])]++;
                    }
                }
            }
        }
        return labelCounts;
    }



    const labelsData = {
        labels: board.labels.map(label => label.title),
        datasets: [
            {
                label: '# of labels',
                data: calcTasksByLabel(),
                backgroundColor: [
                    ...board.labels.map(label => label.color),
                ],
                borderColor: [
                    ...board.labels.map(label => label.color),
                ],
                borderWidth: 3,
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
            title: {
                display: true,
                text: "Labels per task:",
                color: 'white',
                font: {
                    size: '30'
                }
            },
        },
        maintainAspectRatio: false,

    };

    return (
        <Doughnut
            data={labelsData}
            width={350}
            height={350}
            options={options} />
    )
}