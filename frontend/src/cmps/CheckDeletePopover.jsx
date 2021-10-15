import React, { Component } from 'react'
import { Popover } from './Popover/Popover'
import { connect } from 'react-redux'
import { togglePopover } from '../store/app.actions'


export class _CheckDeletePopover extends Component {
    state = {
        typeTitle: ''
    }

    componentDidMount() {
        this.setState(prevState => ({
            ...prevState,
            typeTitle: this.props.typeTitle
        }))
    }

    componentWillUnmount() {
        this.props.setIsPopover(false)
        if (this.props.type !== 'checklist') {
            this.props.setIsEditPopover(false)
        }
    }

    render() {
        const { type, remove } = this.props
        let { typeTitle } = this.state
        if (typeTitle.length > 15) typeTitle = typeTitle.substr(0, 15) + '...'
        const title = `Delete ${typeTitle}?`
        return (
            <div className="no-back-container">
                <Popover title={title} >
                    <div className="no-back">
                        <p>Deleting a {type} is permanent and there<br></br>is no way to get it back.</p>
                        <button className="delete-checklist-btn danger-btn" onClick={() => { remove(); this.props.togglePopover() }}>Delete {type}</button>
                    </div>
                </Popover >
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    togglePopover,
  };

export const CheckDeletePopover = connect(mapStateToProps, mapDispatchToProps)(_CheckDeletePopover)
