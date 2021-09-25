

export const setCurrTaskDetails = (currTaskDetails) => {
    console.log('task task task tasktasktask',currTaskDetails)
    return (dispatch) => {
        dispatch({
            type: "SET_TASK_DETAILS",
            currTaskDetails
        });

    }
}