
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { ReactMediaRecorder } from "react-media-recorder";
import { cloudinaryService } from '../services/cloudinary-service'
import { addTask } from '../store/board.actions';

export class _MediaRecord extends React.Component {
    state = {
        isOverlay: true
    }

    componentDidMount() {
        this.setOverlay(true)
    }

    setOverlay = (isOverlay) => {
        this.setState({ isOverlay })
    }

    render() {
        return (
            <div className={`overlay ${this.state.isOverlay ? 'show' : ''}`} onClick={() => { this.setOverlay(false); this.props.setMediaType('') }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    this.props.type === 'video' && < ReactMediaRecorder
                        video
                        onStop={async (blobUrl, blob) => {
                            const res = await cloudinaryService.uploadFile(null, 'video', blob)
                            const videoUrl = res.secure_url
                            this.props.addTask('Media', this.props.boardId, this.props.groupId, null, videoUrl)
                        }
                        }

                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                            <div className="media-record">
                                <video controls src={mediaBlobUrl} />
                                <div className="flex media-btns">
                                    <button onClick={(ev) => { ev.stopPropagation(); startRecording(); }}><h1>Start Recording</h1></button>
                                    <button onClick={(ev) => { ev.stopPropagation(); stopRecording() }}>Stop Recording</button>
                                </div>

                            </div>
                        )}
                    />
                }
                {
                    this.props.type === 'audio' && <ReactMediaRecorder
                        audio
                        onStop={async (blobUrl, blob) => {
                            const res = await cloudinaryService.uploadFile(null, 'video', blob)
                            const audioUrl = res.secure_url
                            this.props.addTask('Audio', this.props.boardId, this.props.groupId, audioUrl, null)
                        }
                        }

                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                            <div>
                                <button onClick={(ev) => { ev.stopPropagation(); startRecording(); }}><h1>Start Recording</h1></button>
                                <button onClick={(ev) => { ev.stopPropagation(); stopRecording() }}>Stop Recording</button>
                                <audio controls src={mediaBlobUrl} />
                            </div>
                        )}
                    />
                }
            </div >
        );
    }
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
