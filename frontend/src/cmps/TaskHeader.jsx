import React, { useState } from 'react'
import VideoLabel from '@mui/icons-material/VideoLabel';

export function TaskHeader({ taskTitle, setTaksDetailsTitle }) {
    const [title, setTitle] = useState(taskTitle);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setTaksDetailsTitle(title);
    }


    return (
        <header className="task-header">
            <div className="header-content">
                <div className="header-name flex">
                    <VideoLabel className="LabelSvg" />
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <textarea
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    ev.preventDefault();
                                }
                            }}
                            onChange={(e) => { setTitle(e.target.value); handleSubmit(e) }}
                            onBlur={(e) => { setTitle(e.target.value); handleSubmit(e) }}
                            value={title}>
                        </textarea>
                    </form>
                </div>
                <p className="list-name">in list <span style={{ textDecoration: 'underline', fontWeight: 600 }}>Backend</span></p>
            </div>
        </header >
    )
}


