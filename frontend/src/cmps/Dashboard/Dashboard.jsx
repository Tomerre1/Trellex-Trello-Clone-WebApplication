import React from "react";
import { connect } from "react-redux";
import { Close } from "@mui/icons-material";

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
      <div className="dashboard-container flex column">
        <div className="chart">
          <h1>Label statistics:</h1>
          <div>
            {/* <DoughnutChart board={board} /> */}
            <TodoChart board={{ ...board }} />
          </div>
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
