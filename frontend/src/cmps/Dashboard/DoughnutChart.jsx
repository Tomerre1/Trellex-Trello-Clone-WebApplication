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
                const index = labelIds.findIndex(labelId =>
                    board.groups[i].tasks[j].labelIds.includes(labelId))
                if (index !== -1) labelCounts[index]++;
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
                    ...board.labels.map(label =>label.color),
                ],
                borderColor: [
                    ...board.labels.map(label =>label.color),
                ],
                borderWidth: 3,
            },
        ],
    };

    return (
        <Doughnut
            data={labelsData}
            width={350}
            height={350}
            options={{ maintainAspectRatio: false }} />
    )
}