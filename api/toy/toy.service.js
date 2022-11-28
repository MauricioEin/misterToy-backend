const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')

const ObjectId = require('mongodb').ObjectId

async function query(queryParams) {
    try {
        const { filterBy } = queryParams
        const sortBy = queryParams.sortBy || { val: 'name', isAsc: 'true' }
        const criteria = _buildCriteria(filterBy || {})

        const collection = await dbService.getCollection('toy')
        const sortDir = sortBy.isAsc === 'true' ? 1 : -1
        var toys = await collection.find(criteria).sort({ [sortBy.val]: sortDir }).toArray()

        if (!filterBy) return { toys, totalPages: 1 }

        const startIdx = +filterBy.page * +filterBy.pageSize
        const totalPages = Math.ceil(toys.length / filterBy.pageSize)
        toys = toys.slice(startIdx, +startIdx + +filterBy.pageSize)

        return { toys, totalPages }


    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {

        const collection = await dbService.getCollection('toy')
        const addedToy = await collection.insertOne(toy)

        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function addMsg(msg, toyId) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) },  { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }

}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addMsg
}

function _buildCriteria(filterBy) {
    const { name, status, labels } = filterBy
    const criteria = {}
    if (name) criteria.name = { $regex: name, $options: 'i' }
    if (labels) criteria.labels = { $all: labels }
    if (status && status !== 'All') {
        criteria.inStock = { $eq: (status === 'In stock') }
    }

    return criteria
}