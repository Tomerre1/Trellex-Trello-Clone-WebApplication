import React, { Component } from 'react'
import { Popover } from './Popover/Popover'


export class CheckDeletePopover extends Component {
    state = {
    }

    componentDidUpdate(prevProps,prevState){
        console.log('componentDidUpdate')
        console.log('prevProps',prevProps)
        console.log('this.props',this.props)
        console.log('componentDidUpdate')
        if(prevProps.typeTitle!==this.props.typeTitle){
            console.log('hi:',this.props.typeTitle)
        }
    }

    // getRemoveFunc = () =>{
    //     switch (typeTitle) {
    //         case 'checklist':
                
    //            return removeChecklist()
        
    //         default:
    //             break;
    //     }
    // }

    render() {
        const { type, typeTitle, remove } = this.props
        // console.log('this.props', this.props)
        console.log('typeTitle', typeTitle)
        console.log('po')
        if (!this.props) return <React.Fragment></React.Fragment>

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
