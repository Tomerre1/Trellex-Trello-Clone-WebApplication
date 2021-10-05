import React, { Component } from "react";
import { BoardHeader } from "../cmps/BoardHeader";
import { connect } from "react-redux";
import { onLogin } from "../store/user.actions"
import { loadBoard, loadBoards, clearBoard, handleDrag } from "../store/board.actions";
import { loadUsers } from "../store/user.actions";
import { GroupList } from "../cmps/GroupList";
import { DragDropContext } from "react-beautiful-dnd";
import { socketService } from '../services/socket.service'


class _BoardApp extends Component {
  state = {
    isMenuOpen: false,
    currentTarget: null,
  }

  componentDidMount = () => {
  };

  toggleMenu = (ev) => {
    this.setState(prevState => ({ ...prevState, isMenuOpen: !this.state.isMenuOpen }))
    this.setCurrentTarget(ev)
  }
  setCurrentTarget = (event) => {
    this.setState(prevState => ({ ...prevState, currentTarget: event }))
  }

  componentDidMount = async () => {
    if(!this.props.loggedinUser)
      this.props.onLogin({ username:'guest', password:'1'})
    this.loadBoard();
    if (!this.props.boards.length)
      this.props.loadBoards()
    this.props.loadUsers();

    // socketService.on("board-change",this.loadBoard)
  };

  componentWillUnmount = () => {
    this.props.clearBoard();
    // socketService.off("board-change")
  };

  componentDidUpdate = () => {
    if (this.props.match.params?.boardId !== this.props.board?._id) {
      this.props.clearBoard();
      this.loadBoard();
      this.props.loadUsers();
    }
  };
  loadBoard = async () => {
    const id = this.props.match.params.boardId;
    if (!id) this.props.history.push('/workspace')
    if (id) {
      try {
        await this.props.loadBoard(id);
        if (this.props.board == null)
          this.props.history.push('/workspace')

      } catch (err) {
        console.log("cant load board", err);
      }
    }
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    this.props.handleDrag(
      { ...this.props.board },
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };
  render() {
    const { board } = this.props;
    if (!board) return <></>;
    return (<>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <section
          className="board-app flex column"
          style={{
            background: board.style.bgImg
              ? `url(${board.style.bgImg})`
              : board.style.bgClr,
          }}
        >
          <BoardHeader board={{ ...board }} toggleMenu={this.toggleMenu} />
          <GroupList
            groups={[...board.groups]}
            boardId={board._id}
            boardLabels={[...board.labels]}
          />
        </section>
      </DragDropContext>
    </>

    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    boards: state.boardModule.boards,
    user:state.userModule.loggedinUser
  };
}
const mapDispatchToProps = {
  loadBoard,
  loadBoards,
  clearBoard,
  loadUsers,
  handleDrag,
  onLogin
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
