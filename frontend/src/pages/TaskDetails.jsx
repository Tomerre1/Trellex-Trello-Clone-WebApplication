import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import { TaskHeader } from '../cmps/TaskHeader';
import { TaskCardCover } from '../cmps/TaskCardCover'
import { TaskDescription } from '../cmps/TaskDescription'
import { TaskActivities } from '../cmps/TaskActivities'
import { TaskActionsMenu } from '../cmps/TaskActionsMenu'
import { PopoverLabels } from "../cmps/Popover/PopoverLabels";
import { PopoverMembers } from "../cmps/Popover/PopoverMembers";
import { PopoverChecklist } from '../cmps/Popover/PopoverChecklist'
import { PopoverDate } from "../cmps/Popover/PopoverDate";
import { PopoverAttachment } from '../cmps/Popover/PopoverAttachment';
import { PopoverCover } from '../cmps/Popover/PopoverCover';

export class TaskDetails extends Component {
  state = {
    isCover: true,
    currentTarget: null,
    isPopover: false,
    labels: [1, 2, 3]
  }
  contentEl = null;

  // card = {
  //   id: 'c101',
  //   title: 'Task 1',
  //   description: 'Good',
  //   comments: [],
  //   checklist: [
  //     {
  //       id: "wquJCo",
  //       title: "22",
  //       todos: [{
  //         title: "1",
  //         id: "5wqZQb",
  //         isDone: false
  //       }]
  //     }
  //   ],
  //   members: [{
  //     _id: "60b910d79cd5fc23e7bf7c8e",
  //     username: "yoni1234",
  //     fullname: "Yoni Segev",
  //     isAdmin: false,
  //     createdAt: "2021-06-03T17:26:47.000Z",
  //     imgUrl: "https://res.cloudinary.com/plcrased/image/upload/v1623092498/ldagsw7kikkt6fper6m9.jpg",
  //     isOnline: false,
  //   }],
  //   byMember: "loggedinUser",
  //   labels: ['IxisOS', 'ac4xEx'],
  //   createdAt: 1622913131548,
  //   startDate: 0,
  //   dueDate: 1624098480000,
  //   attachments: [],
  //   style: {
  //     coverMode: "header",
  //     bgImgUrl: "",
  //     bgColor: "#60bd4f"
  //   },
  //   isDone: false
  // }
  componentDidMount() {
    //todo get task details from db and insert them to redux props
  }

  setCurrentTarget = (event, type) => {
    this.setState(prevState => ({ ...prevState, type, currentTarget: event.target.getBoundingClientRect() }))
    this.togglePopover()
  };
  togglePopover = () => {
    this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
  }


  render() {
    const { isCover, currentTarget, isPopover, labels, type } = this.state
    const { board } = this.props
    const DynamicCmpPopover = (props) => {
      switch (props.type) {
        case 'LABELS':
          return <PopoverLabels {...props} labels={labels} title='Labels' />
        case 'MEMBERS':
          return <PopoverMembers {...props} members={1, 2, 3} title='Members' />
        case 'CHECKLIST':
          return <PopoverChecklist {...props} title='Checklist' />
        case 'DATE':
          return <PopoverDate {...props} title='Date' />
        case 'ATTACHMENT':
          return <PopoverAttachment {...props} title='Attach from...' />
        case 'COVER':
          return <PopoverCover {...props} title='Cover' />
      }
    }

    return (
      <section className="task-details flex column">
        <button className={`close-task-details ${isCover ? 'cover' : ''}`}><Close /></button>
        <TaskCardCover />
        <TaskHeader />
        <div className="task-details-body flex">
          <div className="task-details-main flex column">
            <TaskDescription />
            <TaskActivities />
          </div>

          <TaskActionsMenu setCurrentTarget={this.setCurrentTarget} togglePopover={this.togglePopover} />
        </div>

        {isPopover && currentTarget && type && <DynamicCmpPopover togglePopover={this.togglePopover} currentTarget={currentTarget} type={type} />}
      </section >

    );
  }
}
