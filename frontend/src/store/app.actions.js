

export const setCurrTaskDetails = (currTaskDetails) => {

    return (dispatch) => {
        console.log(`currTaskDetails from dispatch`, currTaskDetails)
        dispatch({
            type: "SET_TASK_DETAILS",
            currTaskDetails
        });

    }
}