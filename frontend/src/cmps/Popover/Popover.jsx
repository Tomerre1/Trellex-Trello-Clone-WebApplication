import React from "react";
import CloseIcon from '@mui/icons-material/Close';

export class Popover extends React.Component {
    state = {
        visible: false,
        top: 0,
        left: 0,
        type: null
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
        let { left, top } = pos
        const { width } = elRect
        left = pos.left + pos.width / 2 - elRect.width / 2
        top = pos.top + pos.height
        return { left, top, width }
    }


    getBottomPosition = (elRect, targetRect) => {
        return {
            left: ((targetRect.left + targetRect.width) / 2) - (elRect.width / 2),
            top: targetRect.top + targetRect.height
        };
    };


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
            zIndex: 99,
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
            <>
                <div
                    className="popover"
                    ref={(el) => (this.contentEl = el)}
                    style={this.getContentStyles()}
                >
                    <div className="popover-header">
<<<<<<< HEAD
                        <h3> {title}</h3>
=======
                        {/* <h3> {this.props.title}</h3> */}
                        {/* <h3>{title}</h3> */}
                        <span>{title}</span>
                        <button className="clean-btn" onClick={togglePopover}>
                            <CloseIcon />
                        </button>
>>>>>>> f149b5ca96474c4507ea9f303c4ab39cd5127875
                    </div>
                    <div className="popover-content">
                        {children}
                    </div>
                </div>
                <div className="overlay" onClick={togglePopover}></div>
            </>
        );
    }
}

//type from store