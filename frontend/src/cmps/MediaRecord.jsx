
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { ReactMediaRecorder } from "react-media-recorder";
import { cloudinaryService } from '../services/cloudinary-service'
import { addTask } from '../store/board.actions';

const _MediaRecord = (props) => {
    const [isOverlay, setOverlay] = useState(true);
    return (
        <div className={`overlay ${isOverlay ? 'show' : ''}`} onClick={() => { setOverlay(false) }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {props.type === 'video' && < ReactMediaRecorder
                video
                onStop={async (blobUrl, blob) => {
                    const res = await cloudinaryService.uploadFile(null, props.type, blob)
                    const videoUrl = res.secure_url
                    
                }
                }

                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <button onClick={startRecording}><h1>Start Recording</h1></button>
                        <button onClick={stopRecording}>Stop Recording</button>
                    </div>
                )}
            />
            }
            {props.type === 'audio' && <ReactMediaRecorder
                audio
                onStop={async (blobUrl, blob) => {
                    const res = await cloudinaryService.uploadFile(null, props.type, blob)
                    const audioUrl = res.secure_url
                }
                }

                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <button onClick={startRecording}><h1>Start Recording</h1></button>
                        <button onClick={stopRecording}>Stop Recording</button>
                    </div>
                )}
            />
            }
        </div >
    );
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    };
}
const mapDispatchToProps = {
    addTask
};

export const MediaRecord = connect(
    mapStateToProps,
    mapDispatchToProps
)(_MediaRecord);
