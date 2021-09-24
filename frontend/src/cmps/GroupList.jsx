import React from 'react'
import {GroupDetails} from './GroupDetails'
export function GroupList(props) {
    const {groups} = props
    return (
        <div className="group-list">
            {groups &&  groups.map((group,idx)=> <GroupDetails group={group} key={idx}/>)}
            <GroupDetails isAddNew={true}/>
        </div>
    )
}
