import React, { Component } from 'react';


export class AddComment extends Component {
    state = {
        txt: '',
        isEditMode: false
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState(prevState => ({ ...prevState, txt: value }))
    }

    onEditMode = () => {
        if (this.selectedInput) this.selectedInput.focus()
        this.setState({ isEditMode: true })
    }

    onToggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    onAddComment = () => {
        console.log('Add comment here..')
    }

    render() {
        console.log('loggedinUser', this.props.loggedinUser)
        const { loggedinUser } = this.props
        const { isEditMode, txt } = this.state

        return (
            <div className="add-comment flex">
                <article className="member-wrapper">
                    {loggedinUser?.imgUrl ? (
                        <img
                            src={loggedinUser.imgUrl}
                            className="member-img"
                            alt={"member-img"}
                        />
                    ) :
                        (
                            <div className="member-img" style={{ background: 'rgb(223, 225, 230)', color: 'inherit' }}>
                                <p className={`member-letter preview`}>{loggedinUser?.fullname?.[0] || ''}</p>
                            </div>
                        )}
                </article>

                <div className="comment-frame">

                    <textarea onClick={this.onEditMode}
                        className="default-textarea"
                        ref={(input) => { this.selectedInput = input; }}
                        onBlur={this.onToggleEditMode}
                        value={txt}
                        onChange={this.handleChange}

                        placeholder="Write a comment">
           
                           
                    </textarea>

                    {isEditMode && <button
                        className="primary-btn"
                        onClick={this.onAddComment}>
                        Save
                    </button>}



                </div>

            </div>
        )
    }

}
