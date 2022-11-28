const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, addMsg, getLabels } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/label', log, getLabels)
router.get('/:id', getToyById)
router.post('/', requireAuth, requireAdmin, addToy)
router.put('/:id', requireAuth, requireAdmin, updateToy)
router.delete('/:id', requireAuth, requireAdmin, removeToy)
router.post('/:id/msg', requireAuth, addMsg)

module.exports = router