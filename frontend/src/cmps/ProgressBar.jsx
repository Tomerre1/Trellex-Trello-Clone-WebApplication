import { Component } from "react";


export class ProgressBar extends Component {

    state = {
        completed: 0,
        style: {
            width: '',
            backgroundColor: ''
        }
    }

    componentDidMount = () => {
        const completed = this.props.doneTodosCalc()
        const backgroundColor = (completed === 100) ? '#61bd4f' : '#5ba4cf'
        this.setState(prevState => ({ ...prevState, completed, style: { width: `${completed}%`, backgroundColor } }))
    }
    render() {
        const { style, completed } = this.state

        return (
            <div className="checklist-progress" >
                <span className="checklist-progress-percentage js-checklist-progress-percent">{completed}%</span>
                <div className="checklist-progress-bar">
                    <div className="checklist-progress-bar-current js-checklist-progress-bar" style={style}>

                    </div>
                </div>
                {/* <span className="checklist-completed-text hide quiet js-completed-message">Everything in this checklist is complete!</span> */}
            </div>
        )
    }
}