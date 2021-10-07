import React, { Component } from "react";
import { BoardHeader } from "../cmps/BoardHeader";
import { connect } from "react-redux";
import { onLogin } from "../store/user.actions"
import { loadBoard, loadBoards, clearBoard, handleDrag, setFilterBy } from "../store/board.actions";
import { loadUsers } from "../store/user.actions";
import { GroupList } from "../cmps/GroupList";
import { DragDropContext } from "react-beautiful-dnd";
import { socketService } from '../services/socket.service'
import { MediaRecord } from '../cmps/MediaRecord'


class _BoardApp extends Component {
  state = {
    isMenuOpen: false,
    currentTarget: null,
  }

  componentDidMount = async () => {
    this.props.setFilterBy({ labels: [], members: [], search: '' })
    const { boardId } = this.props.match.params
    if (!this.props.user) this.props.onLogin({ username: 'guest', password: '1' })
    this._loadBoard();
    if (!this.props.boards.length) this.props.loadBoards()
    this.props.loadUsers();
    socketService.emit('join-board', boardId)
    socketService.on("updated-board", () => { this.props.loadBoard(boardId) })

  };

  componentWillUnmount = () => {
    this.props.clearBoard();
    socketService.off("updated-board")
    this.props.setFilterBy({ labels: [], members: [], search: '' })

  };

  componentDidUpdate = () => {
    if (this.props.match.params?.boardId !== this.props.board?._id) {
      this.props.clearBoard();
      this._loadBoard();
      this.props.loadUsers();

    }
  };

  toggleMenu = (ev) => {
    this.setState(prevState => ({ ...prevState, isMenuOpen: !this.state.isMenuOpen }))
    this.setCurrentTarget(ev)
  }

  setCurrentTarget = (event) => {
    this.setState(prevState => ({ ...prevState, currentTarget: event }))
  }

  _loadBoard = async () => {
    const id = this.props.match.params.boardId;
    if (!id) this.props.history.push('/workspace')
    if (id) {
      try {
        await this.props.loadBoard(id);
        if (!this.props.board)
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
    user: state.userModule.loggedinUser
  };
}
const mapDispatchToProps = {
  loadBoard,
  loadBoards,
  clearBoard,
  loadUsers,
  handleDrag,
  onLogin,
  setFilterBy
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
