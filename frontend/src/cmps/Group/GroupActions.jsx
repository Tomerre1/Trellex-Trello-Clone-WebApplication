import React from 'react'

export  function GroupActions(props) {
    return (
        <>
        <div className="group-menu" style={props.menuPos}>
          <button onClick={()=>{
            props.removeGroup(props.boardId,props.groupId)
            props.toggleMenuShown(false);
            }}>delete list</button>
        </div>
      </>
    )
}
