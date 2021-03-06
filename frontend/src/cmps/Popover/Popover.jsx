import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import { togglePopover, setPosition, setPopover } from '../../store/app.actions'

export class _Popover extends React.Component {
    state = {
        visible: false,
        top: 0,
        left: 0,
    };
    contentEl = null;

    componentDidMount() {
        this.onSetPopoverPos()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.popover !== this.props.popover) {
            this.onSetPopoverPos()
        }
    }

    toggleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }));

    onSetPopoverPos = () => {
        if (!this.contentEl) return
        const elRect = this.contentEl.getBoundingClientRect()
        let { left, top } = this.setPopoverPos(elRect)
        this.setState({ top, left })
    }

    setPopoverPos(elRect) {
        const { pos } = this.props.popover
        const { width, height } = elRect
        let posX = (window.innerWidth - pos.pageX > 200) ? pos.pageX - 200 : pos.pageX - 200;
        let posY = (window.innerHeight - pos.pageY > 200) ? pos.pageY + 20 : pos.pageY - 200;
        posX = (posX + width > window.innerWidth) ? window.innerWidth - width - 10 : posX;
        posY = (posY + height > window.innerHeight) ? window.innerHeight - height - 20 : posY;
        if (posX < 0) posX = 10;
        return { left: posX, top: posY }
    }

    getContentStyles = () => {
        const { top, left } = this.state;
        const { popover } = this.props
        return {
            position: "fixed",
            opacity: 1,
            top: `${top}px`,
            left: `${left}px`,
            transition: "opacity 0.3s, visibility 0.3s",
            backgroundColor: `${(popover.isMenu) ? '#f4f5f7' : '#fff'}`,
            border: "1px solid lightgray",
            zIndex: 100,
            padding: "0 12px 12px",
            borderRadius: "3px",
            marginRight: "4px",
            maxWidth: "100%",
            boxShadow: "0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08)",
        };
    };

    render() {
        const { title, children, popover } = this.props;
        return (
            <>
                {(popover.isOpen) &&
                    <>
                        <div

                            className={`popover ${popover.isMenu ? 'slide-in-right' : ''}`}
                            ref={(el) => (this.contentEl = el)}
                            style={this.getContentStyles()}
                        >
                            <div className="popover-header">
                                {/* <h3>{title}</h3> */}
                                <span>{title}</span>
                                <button className="clean-btn" onClick={this.props.togglePopover}>
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className="popover-content">
                                {children}
                            </div>
                        </div>
                        <div className="popover-overlay" style={{ position: "fixed", inset: 0, height: "100vh", zIndex: 90 }} onClick={this.props.togglePopover}></div>
                    </>
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        popover: state.appModule.popover,
    };
}
const mapDispatchToProps = {
    togglePopover,
    setPosition,
    setPopover
};

export const Popover = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Popover);
