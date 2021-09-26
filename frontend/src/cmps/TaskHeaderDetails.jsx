import React, { Component } from 'react'

export class TaskHeaderDetails extends Component {
    state = {
        selectedMembers: null,
        selectedLabels: null,
        selectedDate: null
    }
    componentDidMount() {
        const { selectedLabels, selectedMembers, selectedDate } = this.props
        this.setState(prevState => ({ ...prevState, selectedLabels, selectedMembers, selectedDate }))
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
