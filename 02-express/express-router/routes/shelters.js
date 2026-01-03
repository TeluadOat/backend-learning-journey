const express = require('express');
const router = express.Router();
const shelters = require('../controllers/shelters');

router.get('/', shelters.index);
router.post('/', shelters.createShelter);
router.get('/:id', shelters.showShelter);
router.delete('/:id', shelters.deleteShelter);

module.exports = router;