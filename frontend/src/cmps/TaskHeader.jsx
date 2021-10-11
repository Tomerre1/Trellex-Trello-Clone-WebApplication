import React, { useState } from 'react'
import VideoLabel from '@mui/icons-material/VideoLabel';

export function TaskHeader({ taskTitle, setTaksDetailsTitle, taskList }) {
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
                    <textarea
                        style={{ width: '100%' }}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault();
                            }
                        }}
                        onChange={(e) => { setTitle(e.target.value) }}
                        onBlur={(e) => { setTitle(e.target.value); handleSubmit(e) }}
                        value={title}>
                    </textarea>
                </div>
                <p className="list-name">in list <span style={{ textDecoration: 'underline', fontWeight: 600 }}>{taskList}</span></p>
            </div>
        </header >
    )
}


