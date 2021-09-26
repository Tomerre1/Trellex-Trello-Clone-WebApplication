import React, { Component } from "react";

export class TodoPreview extends Component {

    state = {}
    

    render() {
        const { todo } = this.props
        return (
            <div className="todo-preview">
                {/* <h2>Title: {todo.title}</h2> */}
            </div>
        )
    }

}