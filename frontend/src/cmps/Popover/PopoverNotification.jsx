import React, { Component } from "react";
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ActivitiesList } from '../ActivitiesList'
import { withRouter } from "react-router";




class _PopoverNotification extends React.Component {
    state = {
        userNotifications: null
    }

    componentDidMount = () => {
        this.setNotifications()
    }

    setNotifications = () => {
        const { board } = this.props
        const { loggedinUser } = this.props
        const userTasks = []

        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (!task.members || !task.members.length) return
                task.members.forEach(currMember => {
                    if (currMember._id === loggedinUser._id) userTasks.push(task.id)
                })
            })
        })

        let userNotifications = board.activities.filter(activity => {
            return userTasks.includes(activity.task.id)
        })
        userNotifications = JSON.parse(JSON.stringify(userNotifications))

        userNotifications.forEach(notify => {
            notify.isNotRead = true;
            notify.isNotify = true;
        });

        userNotifications.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))
        this.setState(prevState => ({ ...prevState, userNotifications }))
    }

    selectNotification = (notify) => {
        const { board } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === notify.task.id))
        notify.isNotRead = false
        this.NotifyUpdate(notify)
        this.props.history.push(`/board/${board._id}/${currGroup.id}/${notify.task.id}`)
    }

    NotifyUpdate = (notify) => {
        const { userNotifications } = this.state
        const notifyIdx = userNotifications.findIndex(currNotify => currNotify.id === notify.id)
        userNotifications[notifyIdx] = notify
        this.setState(prevState => ({ ...prevState, userNotifications }))
    }

    render() {
        const { title } = this.props
        const { userNotifications } = this.state
        if (!userNotifications) return <></>

        console.log('userNotifications', userNotifications)
        return <div className="board-menu">
            <Popover title={title}>
                <ActivitiesList CommAndAct={userNotifications} isShowActivities={true} currTask={null} selectNotification={this.selectNotification} />
            </Popover>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedinUser: state.userModule.loggedinUser,
    }
}

export const PopoverNotification = withRouter(connect(mapStateToProps, null)(_PopoverNotification))
