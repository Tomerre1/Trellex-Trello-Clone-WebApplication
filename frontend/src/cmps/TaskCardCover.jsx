import React from 'react'
import VideoLabel from '@mui/icons-material/VideoLabel';

export function TaskCardCover({ bgColor }) {
    return (
        <div className="card-cover" style={{ backgroundColor: bgColor }}>
            <button className="cover-btn flex"><VideoLabel /> Cover</button>
        </div>
    )
}

