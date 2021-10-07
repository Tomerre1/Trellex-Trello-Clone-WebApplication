
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
                    const res = await cloudinaryService.uploadFile(null, 'video', blob)
                    const videoUrl = res.secure_url
                    props.addTask('Media', props.boardId, props.groupId, null, videoUrl)
                }
                }

                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div className="media-record">
                        <video controls />
                        <div className="flex media-btns">
                            <button onClick={(ev) => { ev.stopPropagation(); startRecording(); }}><h1>Start Recording</h1></button>
                            <button onClick={(ev) => { ev.stopPropagation(); stopRecording() }}>Stop Recording</button>

                        </div>

                    </div>
                )}
            />
            }
            {props.type === 'audio' && <ReactMediaRecorder
                audio
                onStop={async (blobUrl, blob) => {
                    console.log('blob :>> ', blob);
                    const res = await cloudinaryService.uploadFile(null, 'video', blob)
                    const audioUrl = res.secure_url
                    props.addTask('Audio', props.boardId, props.groupId, audioUrl, null)
                }
                }

                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <button onClick={(ev) => { ev.stopPropagation(); startRecording(); }}><h1>Start Recording</h1></button>
                        <button onClick={(ev) => { ev.stopPropagation(); stopRecording() }}>Stop Recording</button>
                        <audio controls />
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
