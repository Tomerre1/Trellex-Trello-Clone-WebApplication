const boardService = require('./board.service.js');
const logger = require('../../services/logger.service')

// GET LIST boards
async function getBoards(req, res) {
  try {
    const boards = await boardService.query()
    res.json(boards);
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET board BY ID 
async function getBoardById(req, res) {
  try {
    const boardId = req.params.id;
    const board = await boardService.getById(boardId)
    res.json(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

// POST (add board)
async function addBoard(req, res) {
  try {
    const board = req.body;
    const addedBoard = await boardService.add(board)
    res.json(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}


// PUT (Update board)
async function updateBoard(req, res) {
  try {
    const board = req.body;
    const updatedBoard = await boardService.update(board)
    res.json(updatedBoard)
  } catch (err) {
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })

  }
}

// DELETE (Remove car)
async function removeToy(req, res) {
  try {
    const toyId = req.params.id;
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeToy
}
