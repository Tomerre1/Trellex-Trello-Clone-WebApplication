import React from "react";
import { connect } from "react-redux";
import { Close } from "@mui/icons-material";

import { BarChart } from './BarChart'
import { DoughnutChart } from "./DoughnutChart";
import { TodoChart } from "./TodoChart";

export function _Dashboard(props) {

    const onBack = () => {
        props.history.goBack();
    };

    const { board } = props;

    return (
        <section className="dashboard-overlay flex column">
            <button onClick={onBack} class="close-btn clean-btn">
                <Close />
            </button>
            <div className="dashboard-container flex main-layout">
                <div className="chart">
                    <DoughnutChart board={board} />
                </div>
                <div className="chart">
                    <TodoChart board={{ ...board }} />
                </div>
                <div className="chart">
                    <BarChart board={props.board} />
                </div>
            </div>
        </section>
    );
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    };
}

export const Dashboard = connect(mapStateToProps, null)(_Dashboard);
