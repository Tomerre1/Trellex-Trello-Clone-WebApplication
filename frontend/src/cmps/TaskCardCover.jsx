import React from 'react'
import VideoLabel from '@mui/icons-material/VideoLabel';

export function TaskCardCover({ bgColor, setCurrentTarget }) {
    return (
        <div className="card-cover" style={{ backgroundColor: bgColor ? bgColor : '' }}>
            <button className="cover-btn flex" onClick={(event) => { setCurrentTarget(event, 'COVER') }}><VideoLabel /> Cover</button>
        </div >
    )
}

