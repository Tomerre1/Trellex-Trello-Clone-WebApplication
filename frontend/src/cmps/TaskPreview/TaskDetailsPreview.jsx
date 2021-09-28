import React from 'react'

export const TaskDetailsPreview = (props) =>{
    return (
        <span className={` flex align-center ${props.isDone ? 'checklist done checklist' : ''}`}>
          {props.icon}
        {props.txt && <p>{props.txt}</p>}
      </span>
    )
}
