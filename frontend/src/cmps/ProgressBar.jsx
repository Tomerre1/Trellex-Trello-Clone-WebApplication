import { Component } from "react";


export class ProgressBar extends Component {

    state = {}

    render() {
        // return <div>Progress Bar....</div>

const width = '40%'
        return (
            <div className="checklist-progress">
                <span className="checklist-progress-percentage js-checklist-progress-percent">40%</span>
                <div className="checklist-progress-bar">
                    <div className="checklist-progress-bar-current js-checklist-progress-bar" style={{ width}}>

                    </div>
                </div>
                {/* <span className="checklist-completed-text hide quiet js-completed-message">Everything in this checklist is complete!</span> */}
            </div>
        )
    }
}