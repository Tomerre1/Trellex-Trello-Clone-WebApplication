
import React from 'react';
import { connect } from 'react-redux'
import VideoRecorder from "react-video-recorder";
import Grid from "@material-ui/core/Grid";
import { ReactMic } from 'react-mic';
import { cloudinaryService } from '../services/cloudinary-service'
import { addTask } from '../store/board.actions';
import StopIcon from "@material-ui/icons/Stop";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";
import MicIcon from "@material-ui/icons/Mic";



export class _MediaRecord extends React.Component {
    state = {
        record: false,
        isOverlay: true
    };


    componentDidMount() {
        this.setOverlay(true)
    }

    startRecording = () => {
        this.setState({
            record: true
        });
    };

    stopRecording = () => {
        this.setState({
            record: false
        });
    };

    onStop = async (blob, type) => {
        const res = await cloudinaryService.uploadFile(null, 'video', blob)
        const url = res.secure_url
        if (type === 'video') this.props.addTask('Media Video', this.props.boardId, this.props.groupId, null, url)
        else this.props.addTask('Media Audio', this.props.boardId, this.props.groupId, url, null)
        this.props.setMediaType('')
    }

    setOverlay = (isOverlay) => {
        this.setState({ isOverlay })
    }

    render() {
        const StyledFab = styled(Fab)`
        position: relative;
        background-color: ${!this.state.record ? "#272727" : "#8f3934"};
        color: white;
        opacity: 1;
        margin: 12px;
        z-index: 3;
        transition: all 0.2s;
        :hover {
          background-color: ${!this.state.record ? "#272727" : "#8f3934"};
          opacity: 0.9;
        }
      `;

        const { setAudioPath } = this.props;
        return (
            <>
                {
                    <div className="media" style={{ width: "100%", maxWidth: 400, height: 400 }}>
                        {this.props.type === 'video' && <VideoRecorder
                            className="video-recorder"
                            isFlipped={false}
                            countdownTime={0}
                            mimeType="video/webm;codecs=vp8,opus"
                            constraints={{
                                audio: true,
                                video: {
                                    resizeMode: "crop-and-scale",
                                    width: { exact: 480, ideal: 480 },
                                    height: { exact: 640, ideal: 640 },
                                    aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
                                }
                            }}
                            onRecordingComplete={(blob) => this.onStop(blob, 'video')}
                        />}
                    </div>

                }
                {
                    this.props.type === 'audio' && <div className="media">
                        <ReactMic
                            record={this.state.record}
                            className="sound-wave"
                            onStop={(blob) => this.onStop(blob, 'audio')}
                            strokeColor="white"
                            backgroundColor="black"
                            setAudioPath={setAudioPath}
                            height={240}
                            width={400}
                        />
                        <Grid item container justify="center" xs={12}>
                            {!this.state.record && <StyledFab
                                onClick={this.startRecording}
                                color="secondary" aria-label="record">
                                <MicIcon />
                            </StyledFab>}
                            {this.state.record && <StyledFab color="secondary" aria-label="record"
                                onClick={this.stopRecording}>
                                <StopIcon />
                            </StyledFab>}
                        </Grid>

                    </div>
                }
                <div className={`overlay ${this.state.isOverlay ? 'show' : ''} `} onClick={() => { this.props.setMediaType('') }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}></div>
            </>
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
