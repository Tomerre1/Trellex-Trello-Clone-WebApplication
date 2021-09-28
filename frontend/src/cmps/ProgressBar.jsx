import { Component } from "react";


export class ProgressBar extends Component {

    state = {
        completed : 0
    }

    componentDidMount = () => {
        const completed = this.props.doneTodosCalc()
        this.setState(prevState => ({ ...prevState, completed }))
    }

    render() {
        const { completed } = this.state
        const width = `${completed}%`
        return (
            <div className="checklist-progress">
                <span className="checklist-progress-percentage js-checklist-progress-percent">{completed}%</span>
                <div className="checklist-progress-bar">
                    <div className="checklist-progress-bar-current js-checklist-progress-bar" style={{ width }}>

                    </div>
                </div>
                {/* <span className="checklist-completed-text hide quiet js-completed-message">Everything in this checklist is complete!</span> */}
            </div>
        )
    }
}