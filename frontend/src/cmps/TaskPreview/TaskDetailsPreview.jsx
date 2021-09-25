import React from 'react'

export const TaskDetailsPreview = (props) =>{
    return (
        <span className="flex align-center">
          {props.icon}
        {props.txt && <p>{props.txt}</p>}
      </span>
    )
}
