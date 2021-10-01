export const setCurrTaskDetails = (currTaskDetails) => {
    return (dispatch) => {
        console.log(`currTaskDetails from dispatch`, currTaskDetails)
        dispatch({
            type: "SET_TASK_DETAILS",
            currTaskDetails
        });

    }
}

export const toggleDrag = () => {
    return (dispatch) => {
        dispatch({
            type: "TOGGLE_DRAGGING",
        });
    }
}