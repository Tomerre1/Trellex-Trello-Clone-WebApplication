import React from 'react'
import {Group} from './Group'
export function GroupList(props) {
    const {groups} = props
    return (
        <div className="group-list">
            {groups &&  groups.map((group,idx)=> <Group group={group} key={idx}/>)}
        </div>
    )
}
