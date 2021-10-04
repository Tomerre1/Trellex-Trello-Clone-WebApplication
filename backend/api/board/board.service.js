const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = null) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        // const boards = await collection.find(criteria).toArray()
        const boards = await collection.find({}).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}


async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board: ${boardId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        var id = ObjectId(board._id)
        delete board._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ "_id": id }, { $set: { ...board } })
        return board
    } catch (err) {
        logger.error(`cannot update board: ${board._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) criteria.name = { $regex: filterBy.name, $options: 'i' }

    if (filterBy.inStock === 'true') criteria.inStock = { $eq: true }

    if (filterBy.selectedOptions && filterBy.selectedOptions.length > 0) {
        criteria.labels = { $all: filterBy.selectedOptions }
    }

    return criteria
}

function _sortToys(toys, sortBy) {
    switch (sortBy) {
        case 'date':
            toys = _sortByDate(toys)
            break;
        case 'name':
            toys = _sortByName(toys)
            break;
        case 'price':
            toys = _sortByPrice(toys)
            break;
        case 'all':
            break;
    }
    return toys
}

function _sortByDate(toys) {
    return toys.sort(function (a, b) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    });
}

function _sortByName(toys) {
    return toys.sort(function (a, b) {
        return a.name.localeCompare(b.name, "en", { sensitivity: 'variant' })
    });
}

function _sortByPrice(toys) {
    return toys.sort(function (a, b) {
        return a.price - b.price
    });
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
