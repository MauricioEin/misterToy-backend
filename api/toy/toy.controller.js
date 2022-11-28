const toyService = require('./toy.service.js')
const logger = require('../../services/logger.service')

// GET LIST
async function getToys(req, res) {
  try {
    var queryParams = req.query
    const toys = await toyService.query(queryParams)
    res.json(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

// GET BY ID 
async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

// POST (add toy)
async function addToy(req, res) {
  try {
    const toy = req.body
    toy.price = +toy.price
    const addedToy = await toyService.add(toy)

    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}

// PUT (Update toy)
async function updateToy(req, res) {
  try {
    const toy = req.body
    toy.price = +toy.price

    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

// DELETE (Remove toy)
async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

async function addMsg(req, res) {
  try {
    const msg = req.body
    const toyId = req.params.id
    const savedMsg = await toyService.addMsg(msg, toyId)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Cannot add toy msg', err)
    res.status(500).send({ err: 'Cannot add toy msg' })
  }
}

function getLabels(req, res) {
  const labels = ['Doll', 'Battery powered', 'Outdoor', 'Box game', 'Baby', 'Puzzle']
  res.json(labels)
}

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  addMsg,
  getLabels
}
