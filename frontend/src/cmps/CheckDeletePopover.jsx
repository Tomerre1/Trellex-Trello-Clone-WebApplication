import React, { Component } from 'react'
import { Popover } from './Popover/Popover'
import { connect } from 'react-redux'

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

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.typeTitle !== this.props.typeTitle) {
    //         console.log('componentDidUpdate')
    //         console.log('%c  this.props.typeTitle:', 'color: #00000;background: #aaefe5;', this.props.typeTitle);
    //         console.log('componentDidUpdate')
    //         this.setState(prevState => ({
    //             ...prevState,
    //             typeTitle: this.props.typeTitle
    //         }))
    //     }
    // }

    // getRemoveFunc = () =>{
    //     switch (typeTitle) {
    //         case 'checklist':

    //            return removeChecklist()

    //         default:
    //             break;
    //     }
    // }

    render() {
        const { type, remove, togglePopover } = this.props
        const { typeTitle } = this.state
        // console.log('this.props', this.props)
        console.log('typeTitle', typeTitle)

        // if (!this.props.popover.isOpen) return <React.Fragment></React.Fragment>

        const title = `Delete ${typeTitle}?`
        return (
            <div className="no-back-container">
                <Popover title={title} >
                    <div className="no-back">
                        <p>Deleting a {type} is permanent and there<br></br>is no way to get it back.</p>
                        <button className="delete-checklist-btn danger-btn" onClick={() => { remove() }}>Delete {type}</button>
                    </div>
                </Popover >
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        // popover: state.appModule.popover,

    }
}

export const CheckDeletePopover = connect(mapStateToProps, null)(_CheckDeletePopover)
