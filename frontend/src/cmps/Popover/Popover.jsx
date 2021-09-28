import React from "react";
import CloseIcon from '@mui/icons-material/Close';

export class Popover extends React.Component {
    state = {
        visible: false,
        top: 0,
        left: 0,
        type: null,
    };
    contentEl = null;

    componentDidMount() {
        this.onSetPopoverPos()
    }

    toggleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }));

    onSetPopoverPos = () => {
        if (!this.contentEl) return
        const elRect = this.contentEl.getBoundingClientRect()
        let { left, top } = this.setPopoverPos(this.props.currentTarget, elRect)
        this.setState({ top, left })
    }

    setPopoverPos(pos, elRect) {
        const { width } = elRect
        let posX = (window.innerWidth - pos.pageX > 200) ? pos.pageX - 40 : pos.pageX - 200;
        let posY = (window.innerHeight - pos.pageY > 200) ? pos.pageY + 20 : pos.pageY - 200;
        if (posX + width > window.innerWidth) {
            posX = window.innerWidth - width - 20;
        }
        if (posY + elRect.height > window.innerHeight) {
            posY = window.innerHeight - elRect.height - 20;
        }
        return { left: posX, top: posY }
    }


    getContentStyles = () => {
        const { top, left } = this.state;
        return {
            position: "fixed",
            opacity: 1,
            top: `${top}px`,
            left: `${left}px`,
            transition: "opacity 0.3s, visibility 0.3s",
            backgroundColor: "#fff",
            border: "1px solid lightgray",
            padding: "15px",
            zIndex: 200,
            padding: "0 12px 12px",
            borderRadius: "3px",
            marginRight: "4px",
            maxWidth: "100%",
            boxShadow: "0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08)",
        };
    };

    render() {
        const { togglePopover, title, children } = this.props;
        return (
            <div
                className="popover"
                ref={(el) => (this.contentEl = el)}
                style={this.getContentStyles()}
            >
                <div className="popover-header">
                    {/* <h3>{title}</h3> */}
                    <span>{title}</span>
                    <button className="clean-btn" onClick={togglePopover}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="popover-content">
                    {children}
                </div>
            </div>
        );
    }
}

//type from store