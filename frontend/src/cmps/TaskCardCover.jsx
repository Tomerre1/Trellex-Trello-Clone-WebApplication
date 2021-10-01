import React from 'react'
import VideoLabel from '@mui/icons-material/VideoLabel';

export function TaskCardCover({ bgColor, setCurrentTarget, bgUrl }) {
    return (
        <div className="card-cover flex" style={{ backgroundColor: bgColor ? bgColor : '' }}>
            {bgUrl && <img src={bgUrl} style={{ backgroundColor: bgColor ? bgColor : '' }} />}
            {/* {bgUrl && <div className="card-cover-bg" style={{ backgroundImage: `url(${bgUrl})` }}></div>} */}
            <button className="cover-btn flex" onClick={(event) => { setCurrentTarget(event, 'COVER') }}><VideoLabel /> Cover</button>
        </div >
    )
}

